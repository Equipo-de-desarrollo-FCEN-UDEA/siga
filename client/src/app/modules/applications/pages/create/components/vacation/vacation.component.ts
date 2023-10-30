//angular imports
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  ViewChild,
  HostListener,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentObserver } from '@angular/cdk/observers';
import { SignaturePad } from 'angular2-signaturepad';

//rxjs imports
import { from, switchMap } from 'rxjs';

//sweetalert2
import Swal from 'sweetalert2';

//ng-bootstrap imports
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

//interfaces
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { Holiday } from '@interfaces/holiday';
import { VacationCreate } from '@interfaces/applications/vacation';

//services
import { ApplicationTypesService } from '@services/application-types.service';
import { VacationService } from '@services/applications/vacation.service';
import { DocumentService } from '@services/document.service';
import { HolidayService } from '@services/holiday.service';
import { ApplicationSubTypeService } from '@services/application-sub-type.service';

//utils
import { LaboralDays } from '@shared/utils';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss'],
})
export class VacationComponent {
  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();
  public laboralDay: number = 0;
  public laboralflag: boolean = true;
  public verify_date: number = 0;

  // Files
  public files: any[] = [];
  public document_new = [1];
  public documents: file_path[] = [];

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  public id: number = 0;

  public applicationType$ = this.applicationTypeSvc.getApplicationType(5);

  // Signature
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  signatureImg: string = '';

  signaturePadOptions: Object = {
    minWidth: 2,
    canvasWidth: 300,
    canvasHeight: 150,
  };

  isButtonDisabled: boolean = false;
  div_important = document.getElementById('div-signature') as HTMLDivElement;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Actualiza el tamaño del signature-pad
    this.div_important = document.getElementById(
      'div-signature'
    ) as HTMLDivElement;

    this.signaturePad.set('canvasWidth', this.div_important.offsetWidth - 10);
    this.signaturePad.set('canvasHeight', this.div_important.offsetWidth / 2);

    this.signaturePad.clear();
    this.signaturePad.resizeCanvas();
    this.isButtonDisabled = false;
  }

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  get f() {
    return this.form.controls;
  }

  // holidays
  public holidays: Holiday[] = [];

  constructor(
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,

    private applicationTypeSvc: ApplicationTypesService,
    private SubTypeSvc: ApplicationSubTypeService,
    private vacationSvc: VacationService,
    private documentSvc: DocumentService,
    private holidaySvc: HolidayService
  ) {}

  ngAfterViewInit(): void {
    this.holidaySvc.getHolidays().subscribe({
      next: (data) =>{
        this.holidays = data;
      }
    })
  }

  // Form vacation
  public form = this.fb.group({
    application_sub_type_id: [0, [Validators.required, Validators.min(1)]],
    total_days: [0, [Validators.required]],
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
    documents: [this.documents],
    signature: [this.signatureImg],
  });

  submit() {
    this.submitted = true;
    // Se detiene aqui si el formulario es invalido
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: '¡Revise que haya llenado todos los campos que el Formato sugiere',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }
    this.form.value.signature = this.signatureImg;
    
    let vacation = this.vacationSvc.postVacation(
      this.form.value as VacationCreate
    );
    if (this.files.length > 0) {
      vacation = this.documentSvc.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data) {
            this.form.patchValue({
              documents: data.files_paths,
            });
          }
          this.form.value.signature = this.signatureImg;
          return this.vacationSvc.postVacation(
            this.form.value as VacationCreate
          );
        })
      );
      if (this.signatureImg!=""){
        //console.log(vacation);
        vacation.subscribe({
          next: (data) => {
            Swal.fire({
              title: 'La solicitud se creó correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                //redirect to the view component of the application
                this.router.navigate([`/solicitudes/ver/${data.id}/vacaciones`]);
              }
            });
          },
          error: (err) => {
            this.error = err;
          },
        });
      }else{
        Swal.fire({
          title: 'Firmar',
          html: 'Por favor agregue su firma en "Espacio para firma" y haga clic en la opción subir firma',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3AB795',
        });
        return;
      }
      
    }else{
      Swal.fire({
        title: 'Adjuntar documento',
        html: 'Por favor adjunte documento de aval de talento humano.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }
  }

  // --------------------------------------
  // --------- VACATION TYPES  ---------
  // --------------------------------------

  onApplicationSubType(event: Event) {
    // Obtener el value antes de los ':'
    const ID_VACATION_TYPE = (event.target as HTMLSelectElement).value.split(
      ':'
    )[0];
    this.laboralflag=false;
    this.SubTypeSvc.getApplicationSubType(+ID_VACATION_TYPE).subscribe({
      next: (res) => {
        this.laboralDay = res.extra.days;
      },
    });
    if (ID_VACATION_TYPE=="1"){
      this.laboralflag=true;
    }
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  // Subir un archivo
  onUpload(event: Event, index: number) {
    const ELEMENT = event.target as HTMLInputElement;
    const FILE = ELEMENT.files?.item(0);
    if (FILE) {
      this.files.splice(index, 1, FILE);
    }
  }

  // Eliminar achivos
  removeFile(index: number) {
    if (this.document_new.length > 1) {
      this.document_new.splice(index, 1);
    }
    this.files.splice(index, 1);
  }

  // Verifica el tamaño de los archivos que se van a adjuntar al permiso, max:2MB
  validSize() {
    const SIZE = this.files.map((a) => a.size).reduce((a, b) => a + b, 0);
    return SIZE < 6 * 1024 * 1024;
  }

  // Verifica que el archivo a adjuntar sea de un tipo valido
  validFileType() {
    const VALID_EXTENSIONS = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];

    let flag = true;
    this.files.forEach((file) => {
      // separa el último punto del nombre del archivo para verificar su tipo
      flag = VALID_EXTENSIONS.includes(
        file.name.split('.')[file.name.split('.').length - 1]
      );
    });
    return flag;
  }

  // --------------------------------------
  // ------------- SIGNATURE -------------
  // --------------------------------------

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    //console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    //console.log('begin drawing');
  }
  startDrawing(event: Event) {
    //console.log(event);
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad?.clear();
  }

  savePad(event: any) {
    const base64Data = this.signaturePad?.toDataURL();
    this.signatureImg = base64Data;
    //console.log(base64Data);
    Swal.fire({
      title: 'Firma a registrar',
      html: 'Por políticas institucionales, la firma aquí consignada <strong>es obligatoria</strong>,pero solo se usará para emitir el formato.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3AB795',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isButtonDisabled = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.isButtonDisabled = false;
      }
    });
    return;
  }

  // --------------------------------------
  // ------------- DATEPICKER -------------
  // --------------------------------------
  
  selectDays(fromDate: NgbDate | null, toDate: NgbDate | null): boolean {
    const tot_days = this.form.value.total_days;
    const entero_temp=tot_days;

    if (fromDate || toDate) {
      //Verify between laboral days and calendar days
      if (this.laboralflag){
        this.laboralDay=LaboralDays(
          new Date(this.formatter.format(fromDate)),
          new Date(this.formatter.format(toDate)),
          this.holidays
        );
        //Variable to verify (laboralDay)
        this.verify_date=this.laboralDay;
      }else{
        this.verify_date=new Date(this.formatter.format(toDate)).getTime()-
                        new Date(this.formatter.format(fromDate)).getTime();
        //In this case is important to take the date as days:
        this.verify_date=this.verify_date/(1000*3600*24)+1;
      }
      //If days in form does not equal to required, the form does not allow continue      
      if (this.verify_date != entero_temp){
        return true;
      }
      this.form.value.end_date = new Date(this.formatter.format(toDate));
      return false;       

    } else {
      return false;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      console.log('!this.fromDate && !this.toDate');
      this.fromDate = date;
      this.form.patchValue({
        start_date: new Date(
          this.fromDate!.year,
          this.fromDate!.month - 1,
          this.fromDate!.day
        ),
      });
    } else if (this.fromDate && !this.toDate && date) {
      console.log(
        'this.fromDate && !this.toDate && date',
        this.fromDate,
        this.toDate,
        date
      );
      this.toDate = date;
      this.form.patchValue({
        end_date: new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day
        ),
      });
    } else {
      console.log('else', this.fromDate, this.toDate);
      this.toDate = null;
      this.fromDate = date;
      this.form.patchValue({
        start_date: new Date(
          this.fromDate.year,
          this.fromDate.month - 1,
          this.fromDate.day
        ),
      });
      this.form.patchValue({
        end_date: new Date(
          this.toDate!.year,
          this.toDate!.month - 1,
          this.toDate!.day
        ),
      });
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isHoveredInvalid(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      this.selectDays(this.fromDate, this.hoveredDate) &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const PARSED = this.formatter.parse(input);
    return PARSED && this.calendar.isValid(NgbDate.from(PARSED))
      ? NgbDate.from(PARSED)
      : currentValue;
  }
}

import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationTypesService } from '@services/application-types.service';
import Swal from 'sweetalert2';
import { VacationService } from '@services/applications/vacation.service';
import { VacationCreate } from '../../../../../../core/interfaces/applications/vacation';
import { DocumentService } from '@services/document.service';
import { switchMap } from 'rxjs';
import { ApplicationSubTypeService } from '@services/application-sub-type.service';
import { SignaturePad } from 'angular2-signaturepad';
import { LaboralDays } from '@shared/utils';
import { Holiday } from '@interfaces/holiday';
import { HolidayService } from '@services/holiday.service';


@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss']
})
export class VacationComponent implements OnInit {

  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();
  public laboralDay: number = 0;

  // Files
  public files: any[] = [];
  public document_new = [1];
  public documents: file_path[] = [];
 

  // Signature
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  signatureImg: string = "";

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 1000,
    'canvasHeight': 200
  };

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  public id: number = 0;

  public applicationType$ = this.applicationTypeSvc.getApplicationType(5);


  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  get f() { return this.form.controls; }

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

  ) { }

  // Form vacation
  public form = this.fb.group({
    application_sub_type_id: [0, [Validators.required, Validators.min(1)]],
    total_days: [0, [Validators.required]],
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
    documents: [this.documents],
    signature: [this.signatureImg],
  })

  // --------------------------------------
  // ------------ SUBMIT FORM  ------------
  // --------------------------------------

  submit() {
    this.submitted = true;
    // Se detiene aqui si el formulario es invalido
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: '¡Revise que haya llenado todos los campos que el Formato sugiere!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }

    let vacation = this.vacationSvc.postVacation(
      this.form.value as VacationCreate);

    if (this.files.length > 0) {
      vacation = this.documentSvc.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data) {
            this.form.patchValue({
              documents: data.files_paths
            })
          }
          return this.vacationSvc.postVacation(
            this.form.value as VacationCreate)
        })
      )
    }
    vacation.subscribe({
      next: (data) => {
        Swal.fire({
          title: 'La solicitud se creó correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([`/solicitudes/ver/${data.id}/vaciones`])
          }
        });
      }, error: (err) => {
        this.error = err
      }
    })
  }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.vacationSvc.getVacation(this.id).subscribe((data) => {
        // console.log(data);
        this.form.patchValue({
          ...data.vacation,
          application_sub_type_id: data.application_sub_type_id,
        });
        // console.log(data.vacation);
        this.documents = data.vacation.documents!;

        this.SubTypeSvc.getApplicationSubType(+data.application_sub_type_id).subscribe({
          next: (res) => {
            this.laboralDay = res.extra.days;
          },
        });
      });
    });
  }

  ngAfterViewInit(): void {
    //this.signaturePad.set('minWidth', 3); // set szimek/signature_pad options at runtime
    this.signaturePad.set('canvasWidth', 500);
    this.signaturePad.set('border', "5px #e8e8e800")
    this.signaturePad.set('border-style', "double");
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.resizeCanvas();
    this.holidaySvc.getHolidays().subscribe({
      next: (data) => {
        this.holidays = data;
      },
    });
  }
  // --------------------------------------
  // --------- VACATION TYPES  ---------
  // --------------------------------------

  onApplicationSubType(event: Event) {
    // Obtener el value antes de los ':'  
    const ID_PERMISSION_TYPE = (event.target as HTMLSelectElement).value.split(':')[0]
    this.SubTypeSvc.getApplicationSubType(+ID_PERMISSION_TYPE).subscribe({
      next: (res) => {
        this.laboralDay = res.extra.days;
      },
    });
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.
      invalid && this.form.get(controlName)?.touched;
  }
  // --------------------------------------
  // ------------- SIGNATURE -------------
  // --------------------------------------

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  startDrawing(event: Event) {
    console.log(event);
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
    console.log(base64Data);
    Swal.fire({
      title: 'Firma registrada',
      text: 'Por políticas institucionales, la firma aquí consignada no quedará almacenada en Base de Datos, solo se usará para emitir el formato. ',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3AB795',
    });
    event.target.disabled = true;
    return;
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
    return SIZE < 2 * 1024 * 1024;
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
  // ------------- DATEPICKER -------------
  // --------------------------------------

  selectDays(fromDate: NgbDate | null, toDate: NgbDate | null): boolean {
    if (fromDate || toDate) {
      return (
        LaboralDays(
          new Date(this.formatter.format(fromDate)),
          new Date(this.formatter.format(toDate)),
          this.holidays
        ) > this.laboralDay
      );
    } else {
      return false;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      console.log('!this.fromDate && !this.toDate')
      this.fromDate = date;
      this.form.patchValue({
        start_date: new Date(
          this.fromDate!.year,
          this.fromDate!.month - 1,
          this.fromDate!.day
        ),
      });
    } else if (this.fromDate && !this.toDate && date) {
      console.log('this.fromDate && !this.toDate && date', this.fromDate, this.toDate, date)
      this.toDate = date;
      this.form.patchValue({
        end_date: new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day
        ),
      });
    } else {
      console.log('else', this.fromDate, this.toDate)
      this.toDate = null;
      this.fromDate = date
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

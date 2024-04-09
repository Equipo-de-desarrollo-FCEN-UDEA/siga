//angular imports
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//ngBootstrap imports
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

//rxjs imports
import { switchMap } from 'rxjs';

//sweetAlert imports
import Swal from 'sweetalert2';

//interfaces imports
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { Holiday } from '@interfaces/holiday';
import { VacationCreate } from '@interfaces/applications/vacation';

//services imports
import { ApplicationTypesService } from '@services/application-types.service';
import { VacationService } from '@services/applications/vacation.service';
import { DocumentService } from '@services/document.service';
import { ApplicationSubTypeService } from '@services/application-sub-type.service';
import { HolidayService } from '@services/holiday.service';

//shared imports
import { LaboralDays } from '@shared/utils';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss'],
})
export class VacationComponent implements OnInit {
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
  public documentsToDelete: file_path[] = [];

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  public id: number = 0;

  public applicationType$ = this.applicationTypeSvc.getApplicationType(5);

  // holidays
  public holidays: Holiday[] = [];
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

  constructor(
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private router: Router,
    private route: ActivatedRoute,

    private applicationTypeSvc: ApplicationTypesService,
    private SubTypeSvc: ApplicationSubTypeService,
    private vacationSvc: VacationService,
    private documentSvc: DocumentService,
    private holidaySvc: HolidayService
  ) {
    this.fromDate = null;
    this.toDate = null;
  }

  // Form vacation
  public form = this.formBuilder.group({
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
    total_days: [1, [Validators.required]],
    application_sub_type_id: [12],

    total_working_days: [0],
    start_working_date: [new Date()],
    end_working_date: [new Date()],

    total_calendar_days: [0],
    start_calendar_date: [new Date()],
    end_calendar_date: [new Date()],

    documents: [this.documents],
    signature: [this.signatureImg],
  });

  setDates(event: any) {
    this.form.patchValue({
      start_working_date: event.start_date,
      end_working_date: event.end_date,
    });
  }

  setDatesCalendar(event: any) {
    this.form.patchValue({
      start_calendar_date: event.start_date,
      end_calendar_date: event.end_date,
    });
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.vacationSvc.getVacation(this.id).subscribe((data) => {
        this.documents = data.vacation.documents!;

        this.form.patchValue({
          total_working_days: data.vacation.total_working_days,
          total_calendar_days: data.vacation.total_calendar_days,
          documents: data.vacation.documents,
          start_calendar_date: data.vacation.start_calendar_date,
          end_calendar_date: data.vacation.end_calendar_date,
          start_working_date: data.vacation.start_working_date,
          end_working_date: data.vacation.end_working_date,
        });
        let status_app =
          data.application_status[data.application_status.length - 1].status
            .name;
        if (status_app != 'APROBADA') {
          this.documents.pop();
        } else {
          Swal.fire({
            title: 'Solicitud Aprobada',
            html: 'Su solicitud está aprobada, y por tal motivo no se puede editar',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          });

          return;
        }
        this.SubTypeSvc.getApplicationSubType(
          +data.application_sub_type_id
        ).subscribe({
          next: (res) => {
            //this.laboralDay = res.extra.days;
            this.laboralflag = true;
          },
        });
      });
    });
  }

  ngAfterViewInit(): void {
    this.holidaySvc.getHolidays().subscribe({
      next: (data) => {
        this.holidays = data;
      },
    });
  }

  // --------------------------------------
  // ------------ SUBMIT FORM  ------------
  // --------------------------------------
  submit() {
    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.form.invalid) {
      return;
    }

    const isWorkingDaysSet = this.form.get('total_working_days')?.value === 0;
    const isCalendarDaysSet = this.form.get('total_calendar_days')?.value === 0;

    if (isWorkingDaysSet && isCalendarDaysSet) {
      Swal.fire({
        title: 'Error',
        text: '¡Debe seleccionar un rago de fechas en al menos en un tipo de vacaciones!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }

    let vacation = this.vacationSvc.putVacation(
      this.form.value as VacationCreate,
      this.id
    );

    this.form.value.signature = this.signatureImg;

    if (this.files.length > 0) {
      vacation = this.documentSvc.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data) {
            this.form.patchValue({
              documents: data.files_paths,
            });
          }
          this.form.value.signature = this.signatureImg;
          return this.vacationSvc.putVacation(
            this.form.value as VacationCreate,
            this.id
          );
        })
      );
      if (this.signatureImg != '') {
        vacation.subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Actualizado',
              text: '¡El registro de vacaciones se actualizó con éxito!',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3AB795',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate([
                  'solicitudes/ver/' + this.id + '/vacaciones',
                ]);
              }
            });
          },
          error: (err) => {
            this.error = err;
          },
        });
      } else {
        Swal.fire({
          title: 'Firmar',
          html: 'Por favor agregue su firma en "Espacio para firma" y haga clic en la opción subir firma',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3AB795',
        });
        return;
      }
    } else {
      if (this.documents.length > 0) {
        if (this.signatureImg != '') {
          vacation.subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Actualizado',
                text: '¡El registro de vacaciones se actualizó con éxito!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3AB795',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate([
                    'solicitudes/ver/' + this.id + '/vacaciones',
                  ]);
                }
              });
            },
            error: (err) => {
              this.error = err;
            },
          });
        } else {
          Swal.fire({
            title: 'Firmar',
            html: 'Por favor agregue su firma en "Espacio para firma" y haga clic en la opción subir firma',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          });
          return;
        }
      } else {
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
  }

  // --------------------------------------
  // ------------- SIGNATURE -------------
  // --------------------------------------

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
  }
  startDrawing(event: Event) {
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
  // --------- VACATION TYPES  ---------
  // --------------------------------------

  onApplicationSubType(event: Event) {
    // Obtener el value antes de los ':'
    const ID_VACATION_TYPE = (event.target as HTMLSelectElement).value.split(
      ':'
    )[0];
    this.laboralflag = false;
    this.SubTypeSvc.getApplicationSubType(+ID_VACATION_TYPE).subscribe({
      next: (res) => {
        this.laboralDay = res.extra.days;
      },
    });

    if (ID_VACATION_TYPE == '1') {
      this.laboralflag = true;
    }
  }

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  // Acceder a los form
  get f() {
    return this.form.controls;
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  deleteDocument(path: string, i: number) {
    Swal.fire({
      title: 'Eliminar documento',
      text: '¿Está seguro de querer eliminar este documento?, no podrá recuperarlo',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documents.splice(i, 1);
      }
    });
  }

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
}

//angular imports
import { Component, ViewChild, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
//ng-bootstrap imports
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss'],
})
export class VacationComponent {
  // Date picker
  public laboralDay: number = 0;
  public laboralflag: boolean = true;
  public verify_date: number = 0;
  // Files
  public files: any[] = [];
  public documents: file_path[] = [];
  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;
  // Obtener el type de vacaciones
  public application_type_number = 5;
  public applicationType$ = this.applicationTypeSvc.getApplicationType(5);
  // FileUpload
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;
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

  public form = this.fb.group({
    start_date: new Date(),
    end_date: new Date(),
    application_sub_type_id: [12],
    total_working_days: [0],
    start_working_date: [null],
    end_working_date: [null],

    total_calendar_days: [0],
    start_calendar_date: [null],
    end_calendar_date: [null],

    documents: [this.documents],
    signature: [this.signatureImg],
  });

  constructor(
    private fb: FormBuilder,
    public formatter: NgbDateParserFormatter,
    private router: Router,
    private applicationTypeSvc: ApplicationTypesService,
    private SubTypeSvc: ApplicationSubTypeService,
    private vacationSvc: VacationService,
    private documentSvc: DocumentService,
    private holidaySvc: HolidayService
  ) {}

  ngAfterViewInit(): void {
    this.holidaySvc.getHolidays().subscribe({
      next: (data) => {
        this.holidays = data;
      },
    });
  }

  // Form vacation
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

  submit() {
    this.submitted = true;

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

    // Se detiene aqui si el formulario es invalido
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

      if (this.signatureImg != '') {
        vacation.subscribe({
          next: (data) => {
            Swal.fire({
              title: 'La solicitud se creó correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed) {
                //redirect to the view component of the application
                this.router.navigate([
                  `/solicitudes/ver/${data.id}/vacaciones`,
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
        html: 'Por favor adjunte documento de talento humano.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }
  }

  // Resivir valores del output para ponerlos en el componente padre

  SetDocuments(event: any) {
    this.form.patchValue({
      documents: event.documents,
    });
  }

  SetFiles(event: any) {
    this.files = event;
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }

  invalidFile() {
    return this.fileUploadComponent?.invalidFile();
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
}

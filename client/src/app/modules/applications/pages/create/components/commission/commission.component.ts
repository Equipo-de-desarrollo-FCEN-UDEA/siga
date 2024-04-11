import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommissionCreate } from '@interfaces/applications/commission';
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationTypesService } from '@services/application-types.service';
import { CommissionService } from '@services/applications/commission.service';
import { DocumentService } from '@services/document.service';
import { LoaderService } from '@services/loader.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent {


  // Dates
  public hiddenIds: number[] = [9];
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // Files
  public files : any[] = [];
  public documents: file_path[] = []

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  // FileUpload
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;

  public comision_type$: any;

  public applicationType$ = this.applicationTypeSvc.getApplicationType(2);


  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  get f() { return this.form.controls; }

  constructor(
    private fb: FormBuilder,
    private calendar : NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private ngZone: NgZone,
    private router: Router,
    private cd: ChangeDetectorRef,

    private applicationTypeSvc: ApplicationTypesService,
    private commissionSvc: CommissionService,
    private documentService: DocumentService
  ) {
   }

   public form = this.fb.group({
    country: ['', [Validators.required]],
    state: [''],
    city: [''],
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
    reason: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    lenguage: ['', [Validators.required, Validators.maxLength(50)]],
    justification: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    documents: [this.documents]

  })


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
    let commission = this.commissionSvc.postCommission(this.form.value as CommissionCreate)
    if (this.files.length > 0) {
      commission = this.documentService.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data) {
            this.form.patchValue({
              documents: data.files_paths
            })
          }
          return this.commissionSvc.postCommission(this.form.value as CommissionCreate)
        })
      )
    }
    commission.subscribe({
      next: data => {
        Swal.fire(
          {
            title: 'La comisión se creó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([`/solicitudes/ver/${data.id}/comision`])
          }
        })
      }}
    )

  }

  // --------------------------------------
  // ------------- DATEPICKER -------------
  // --------------------------------------


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.form.patchValue({
      start_date : (new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day)),
      end_date : (new Date(this.toDate!.year, this.toDate!.month - 1, this.toDate!.day))
    });
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  // --------------------------------------
  // ----------- TIPO DE SOLICITUD ---------
  // --------------------------------------
  onChangeSolicitud(e: any): void {
    this.cd.detectChanges();
  }
  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.
    invalid && this.form.get(controlName)?.touched;
  }

  // --------------------------------------
  // ----------- upload file ---------
  // --------------------------------------
  // Resivir valores del output para ponerlos en el componente padre

  SetDocuments(event: any) {
    this.form.patchValue({
      documents: event.documents,
    });
  }
  SetFiles(event: any) {
    this.files = event;
  }
  invalidFile() {
    return this.fileUploadComponent?.invalidFile();
  }

}

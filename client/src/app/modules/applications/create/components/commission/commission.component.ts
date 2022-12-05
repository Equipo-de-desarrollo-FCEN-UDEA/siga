import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
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

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent {


  // Dates
  public fromDate: NgbDate | null = null;
  public hoveredDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  public model: NgbDateStruct | null = null;
  public today = this.calendar.getToday();

  // Files 
  public files : any[] = [];
  public archivos = [1];
  public documents: file_path[] = []

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

  public comision_type$: any;

  public isLoading = this.loaderSvc.isLoading;

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

    private loaderSvc: LoaderService,
    private applicationTypeSvc: ApplicationTypesService,
    private commissionSvc: CommissionService,
    private documentService: DocumentService
  ) {
   }

   public form = this.fb.group({
    application_sub_type_id: [0, [Validators.required, Validators.min(1)]],
    country: ['', [Validators.required]],
    state: [''],
    city: [''],
    start_date: [new Date(), [Validators.required]],
    end_date: [new Date(), [Validators.required]],
    lenguage: ['', [Validators.required, Validators.maxLength(50)]],
    justification: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(500)]],
    documents: [this.documents]
   
  })


  submit() {
    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.form.invalid) {
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
          console.log(this.form.value)
          return this.commissionSvc.postCommission(this.form.value as CommissionCreate)
        })
      )
    }
    console.log(this.form.value as CommissionCreate)
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
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
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
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event:Event, index: number) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.files.splice(index, 1, file);
    }
  }

  removeFile(index: number) {
    if (this.archivos.length > 1) {
    this.archivos.splice(index, 1);};
    this.files.splice(index, 1);
  }

  validSize() {
    const size = this.files.map(a => a.size).reduce((a, b) => a + b, 0);
    return size < 2 * 1024 * 1024;
  }

  validFileType() {
    const extensionesValidas = ["png", "jpg", "gif", "jpeg", "pdf"];
    
    let flag = true; 
    this.files.forEach((file) => {
      flag = extensionesValidas.includes(file.name.split(".")[file.name.split(".").length - 1]);
    })
    return flag;

  }



  // --------------------------------------
  // -------- LUGAR - PAISES - CIUDAD -----
  // --------------------------------------

  // onChangePais(event:any) {
  //   const paisId = event.target.value;
  //   this.pais = this.paises[paisId];
  //   this.paisesCiudadesSvc.getEstados(this.pais).subscribe(
  //     (data:Estado[]) => {
  //       this.provincias = data;
  //     }
  //   )
  // }

  // onChangeEstado(event:any) {
  //   const estadoId = event.target.value;
  //   this.provincia = this.provincias[estadoId];
  //   this.paisesCiudadesSvc.getCiudades(this.pais, this.provincia).subscribe(
  //     (data:Ciudad[]) => {
  //       this.ciudades = data;
  //     }
  //   );
  // }

}

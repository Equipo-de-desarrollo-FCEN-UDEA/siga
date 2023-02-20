import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationTypesService } from '@services/application-types.service';
import Swal from 'sweetalert2';
import { VacationService } from '@services/applications/vacation.service';
import { VacationCreate } from '../../../../../../core/interfaces/applications/vacation';
import { DocumentService } from '@services/document.service';
import { switchMap } from 'rxjs';


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

  public files : any[] = [];
  public archivos = [1];
  public documents: file_path[] = []

  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;

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
    private vacationSvc: VacationService,
    private documentSvc: DocumentService
  
  ) { }

  public form = this.fb.group({
    application_type_id: [0, [Validators.required, Validators.min(1)]],
    documents: [this.documents],
    days: [0, [Validators.required, Validators.min(1)]],
    })

  submit(){
    this.submitted = true;
    // Se detiene aqui si el formulario es invalido
    if(this.form.invalid){
      Swal.fire({
        title: 'Error',
        text: '¡Revise que haya llenado todos los campos que el Formato sugiere!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }

    let vacation = this.vacationSvc.postVacation(this.form.value as VacationCreate)
    if (this.files.length > 0) {
      vacation = this.documentSvc.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data){
            this.form.patchValue({
              documents: data.files_paths
            })
          }
          return this.vacationSvc.postVacation(this.form.value as VacationCreate)
        })
      )
    }
    vacation.subscribe({
      next:data =>{
        Swal.fire(
          {
            title:'La solicitud se creó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }
        ).then((result)=>{
          if (result.isConfirmed){
            this.router.navigate([`/solicitudes/ver/${data.id}/vaciones`])
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

  // Tipo de días de vacaciones

  onChangeSolicitud(e: any): void {
    this.cd.detectChanges();
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.
    invalid && this.form.get(controlName)?.touched;
  }

}

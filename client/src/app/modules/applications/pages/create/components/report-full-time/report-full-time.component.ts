import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Application } from '@interfaces/application';

import { FullTimeCreate, FullTimeInDB, FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { ReportFullTimeCreate } from '@interfaces/applications/report-full-time';
import { DocumentsResponse, file_path } from '@interfaces/documents';
import { ApplicationStatusService } from '@services/application-status.service';
import { ApplicationTypesService } from '@services/application-types.service';
import { ApplicationService } from '@services/application.service';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { ReportFullTimeService } from '@services/applications/report-full-time.service';
import { DocumentService } from '@services/document.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, from, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-full-time',
  templateUrl: './report-full-time.component.html',
  styleUrls: ['./report-full-time.component.scss']
})
export class ReportFullTimeComponent {
  public fullTime$ = new Observable<FullTimeCreate>();
  public historyFullTime = false;
  public applications: Application [] = [];
  public full_time: FulltimeResponse [] = [];

  // Files
  public files: any[] = [];
  public archivos = [1];
  public documents: file_path[] = [];
  // For handle errors
  public clicked = 0;
  public error = '';
  public submitted = false;
  public from_full_time: boolean = true;

  public applicationType$ = this.applicationTypeSvc.getApplicationType(7);
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ChangeDetectorRef: ChangeDetectorRef,

    private applicationSvc: ApplicationService,
    private applicationStatusSvc: ApplicationStatusService,
    private applicationTypeSvc: ApplicationTypesService,
    private reportFullTimeSvc: ReportFullTimeService,
    private fullTimeSvc: FullTimeService,
    private documentService: DocumentService
    
  ) {
   }

   public form = this.fb.group({
    from_full_time: [true],
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    justification: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    documents: [this.documents]
   
  })

  updateFromFullTime(event: any) {
    const value = event.target.value === 'true';
    this.from_full_time = value;
    console.log(this.from_full_time)
  }  
  
  submit() {
    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.form.invalid) {
      Swal.fire({
        title: 'Error',
        text: '¡Revise que haya subido todos los documentos!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }
    let reportFullTime = this.reportFullTimeSvc.postReportFullTime(this.form.value as ReportFullTimeCreate)
    if (this.files.length > 0) {
      reportFullTime = this.documentService.postDocument(this.files as File[]).pipe(
        switchMap((data: DocumentsResponse) => {
          if (data) {
            this.form.patchValue({
              documents: data.files_paths
            })
          }
          console.log(this.form.value)
          return this.reportFullTimeSvc.postReportFullTime(this.form.value as ReportFullTimeCreate)
        })
      )
    }
    console.log(this.form.value as ReportFullTimeCreate)
    reportFullTime.subscribe({
      next: data => {
        Swal.fire(
          {
            title: 'El informe final se creo correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }
        ).then((result) => {
          // if (result.isConfirmed) {
          //   this.router.navigate([`/solicitudes/ver/${data.id}/reporte-final`])
          // }
        })
      }}
    )

  }

  onChangeSolicitud(e: any): void {
    this.ChangeDetectorRef.detectChanges();
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
    if (this.archivos.length > 1) {
      this.archivos.splice(index, 1);
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

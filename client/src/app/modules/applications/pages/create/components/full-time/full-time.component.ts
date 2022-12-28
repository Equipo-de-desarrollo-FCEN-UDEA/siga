import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FullTimeCreate, FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { file_path } from '@interfaces/documents';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full-time',
  templateUrl: './full-time.component.html',
  styleUrls: ['./full-time.component.scss']
})
export class FullTimeComponent {

  public submitted: boolean = false;
  public documents: file_path[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,

    private fullTimeSvc: FullTimeService
  ) { 
  
  }

  // Form permiso
  public form = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ],
    ],
    documents: [this.documents],
  });

  // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  get f() { return this.form.controls; }


  // --------------------------------------
  // ------------ SUBMIT FORM  ------------
  // --------------------------------------
  submit() {
    this.submitted = true;

    // Se detiene aqui si el formulario es invalido
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value as FullTimeCreate)

    let fullTime = this.fullTimeSvc.postFullTime(
      this.form.value as FullTimeCreate
    );
    console.log(this.form.value as FullTimeCreate);
    fullTime.subscribe({
      next: (data: FulltimeResponse) => {
        console.log('data', data)
        Swal.fire({
          allowOutsideClick: false,
          title: 'Dedicación exclusiva en creación',
          text: 'Para solicitar la dedicación debes diligenciar los 3 formatos y dar clic en actualizar',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#3AB795',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/solicitudes/editar/'+data.id+'/dedicacion']) 
          } 
        })
      }
    });

  }
  validSize(){
    return true
  }

  validFileType(){
    return true
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FullTimeCreate, FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { DocumentService } from '@services/document.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full-time',
  templateUrl: './full-time.component.html',
  styleUrls: ['./full-time.component.scss']
})
export class FullTimeComponent {

  private id: string = '0';
  public submitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,

    private fullTimeSvc: FullTimeService
  ) { 
    // Swal.fire({
    //   allowOutsideClick: false,
    //   title: 'Nueva dedicación exclusiva',
    //   text: 'Escribe un título de referencia para crear la dedicación',
    //   input: 'text',
    //   showCancelButton: true,
    //   cancelButtonText: 'Cancelar',
    //   confirmButtonText: 'Continuar',
    //   reverseButtons: true,
    //   confirmButtonColor: '#3AB795',
      
    //   preConfirm: (titulo) => {
    //     if (!titulo) {
    //       return Swal.showValidationMessage('Debes escribir un título');
    //     }
    //   }
    // }).then((result) => {
    //   if (result.isConfirmed && result.value) {

    //     console.log('result.value', result.value as FullTimeCreate)

    //     let fullTime = this.fullTimeSvc.postFullTime(result.value as FullTimeCreate)

    //     console.log('fullTime', fullTime)
        
    //     fullTime.subscribe({
    //       next: (data: FulltimeResponse) => {
            
    //         //this.router.navigate(['/solicitudes/editar/'+this.id +'/dedicacion'])
    //         this.id = data.full_time.id;

    //       },
    //       error: (err: any) => {}
    //     })
        
    //   } 
    //   else {
    //     this.router.navigate(['/home'])
    //   }
    // })
  }

  // Form permiso
  public form = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(500),
      ],
    ]
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

    let fullTime = this.fullTimeSvc.postFullTime(
      this.form.value as FullTimeCreate
    );
    console.log(this.form.value as FullTimeCreate);
    fullTime.subscribe({
      next: (data: FulltimeResponse) => {
        Swal.fire({
          allowOutsideClick: false,
          title: 'Dedicación exclusiva en creación',
          text: 'Para solicitar la dedicación debes diligenciar los 3 formatos y dar clic en actualizar',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#3AB795',
        }).then((result) => {
          if (result.isConfirmed) {
            // this.id = data.full_time.id;
            this.router.navigate(['/solicitudes/editar/'+data.full_time.id+'/dedicacion']) 
          } 
        })
        // Swal.fire({
        //   title: 'Dedicación exclusiva en creación',
        //   text: 'Para iniciar ',
        //   icon: 'success',
        //   confirmButtonText: 'Aceptar',
        //   confirmButtonColor: '#3AB795',
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     this.router.navigate([`/solicitudes/ver/${data.id}/permiso`])
        //   }
        // });
      },
      // error: (err)=> {
      //   this.error = err
      // }
    });

  }
  validSize(){

  }

  validFileType(){

  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

}

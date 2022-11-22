//angular 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  public form!: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public error: string = "";

  get f() { return this.form.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;

    //return is the form is invalid
    if (this.form.invalid) { return; }

    this.loading = true;

    this.authService.forgotPassword(this.f['username'].value).subscribe({
      next: (res:any) => {
        Swal.fire({
          title: 'Una nueva contraseña fue enviada al correo electrónico'+ this.f['username'].value,
          text: res.message,
          icon: 'success',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Aceptar'
        })
      },
      error: (err:any) => {
        Swal.fire({
          title: 'Algo ocurrió mal',
          text: err.message,
          icon: 'error',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Aceptar'
      })
      }
    })
    this.loading = false;
  }
}

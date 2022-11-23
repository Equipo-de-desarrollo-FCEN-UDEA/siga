//angular 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Msg } from '@interfaces/msg';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
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

  public isLoading = this.loaderSvc.isLoading;

  get f() { return this.form.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loaderSvc: LoaderService
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
    this.authService.passwordRecovery(this.f['username'].value).subscribe({
      next: (res:Msg) => {
        Swal.fire({
          title: 'Recuperar contraseña',
          text: res.msg,
          icon: 'success',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }
}

//angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Swal
import Swal from 'sweetalert2';

//interfaces
import { Msg } from '@interfaces/msg';

//services
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public form!: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public error: string = '';

  public isLoading = this.loaderSvc.isLoading;

  get f() {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loaderSvc: LoaderService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    //return is the form is invalid
    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.authService.forgotPassword(this.f['email'].value).subscribe({
      next: (res: any) => {
        Swal.fire({
          title:
            'Recuperación de contraseña',
          text: res.msg,
          icon: 'success',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import { passwordMatchValidator } from '@shared/directives/password-match.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public isLoading = this.loaderSvc.isLoading;

  private token = '';

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private loaderSvc: LoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.params.subscribe(
      params => {
        this.token = params['token']
      }
    )
  }

  public form = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      repeatNewPassword: ['', [Validators.required]],
    }, 
    {validators: passwordMatchValidator}
  );

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.authSvc.resetPassword(this.form.value.newPassword!, this.token).subscribe(
        res => {
          Swal.fire({
            title: 'Reestablecer contraseña',
            text: res.msg,
            confirmButtonText: 'Continuar',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed){
              this.router.navigate(['auth/login'])
            }
          })
        }
      )
    }
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

}

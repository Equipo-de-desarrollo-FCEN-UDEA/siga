import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import { UserService } from '@services/user.service';
import { passwordMatchValidator } from '@shared/directives/password-match.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  public isLoading = this.loaderSvc.isLoading;

  private token = '';

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private loaderSvc: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
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
      this.userSvc.newPassword(this.form.value.newPassword!, this.form.value.repeatNewPassword!).subscribe(
        res => {
          Swal.fire({
            title: 'Cambio de contraseña',
            text: 'Su contraseña se cambió correctamente',
            confirmButtonText: 'Continuar',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed){
              this.router.navigate(['/home'])
            }
          })
        }
      )
    }
  }

  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

  cancel() {
    this.location.back()
  }

}

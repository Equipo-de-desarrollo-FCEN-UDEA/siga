import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resend-email',
  templateUrl: './resend-email.component.html',
  styleUrls: ['./resend-email.component.scss']
})
export class ResendEmailComponent implements OnInit {

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
      username: ['', [Validators.required]],
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

    this.authService.sendActivateEmail(this.f['username'].value).subscribe({
      next: (res: any) => {
        Swal.fire({
          title:
            'Correo de activación',
          text: res.msg,
          icon: 'success',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }
}

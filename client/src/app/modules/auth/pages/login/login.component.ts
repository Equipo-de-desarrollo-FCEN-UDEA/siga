//angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//sweetalert2
import Swal from 'sweetalert2';

//interfaces
import { Auth } from '@interfaces/auth';

//service
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public submitted: boolean = false;
  public loading: boolean = false;
  public form!: FormGroup;
  public error:string = '';
  public activation: boolean = false;
  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  public isLoading = this.loaderSvc.isLoading;

  get f() { return this.loginForm.controls;}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderSvc: LoaderService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmitLogin() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) { return; }
    this.loading = true;  
    this.authService.login(this.loginForm.value as Auth).subscribe({
      next: () => {
        //this.router.navigate(['/solicitudes/ver/1/comision']);
        //this.router.navigate(['/solicitudes/editar/60/permiso']);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.activation = true;
        if (err.status === 404 || err.status === 401) {
          this.error = 'Usuario o contraseña incorrectos';
          Swal.fire({
            title: 'Usuario o contraseña incorrectos',
            confirmButtonText: 'Intentar de nuevo',
            icon: 'warning'
          })
        }
      }
    })
    this.loading = false;
  }
}

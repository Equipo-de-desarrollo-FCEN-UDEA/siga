//angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//interfaces
import { Auth, Token } from '@interfaces/auth';
import { UserCreate } from '@interfaces/user';

//service
import { AuthService } from '@services/auth.service';
import Swal from 'sweetalert2';


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
  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  get f() { return this.loginForm.controls;}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmitLogin() {
    const USER : Auth = {
      username: this.loginForm.value.usernameLogin || '',
      password: this.loginForm.value.passwordLogin || ''
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) { return; }

    this.loading = true;
     
    //TODO:INTERFAZ AUTH
    // this.authService.login(USER).subscribe({
    //   next: (res:Token) => {
    //     this.router.navigate(['/home']);
    //   },
    // }),
    // error: (err) => {
    //   if (err.status === 404 || err.status === 401) {
    //     this.error = 'Usuario o contraseña incorrectos';
    //     Swal.fire({
    //       title: 'Usuario o contraseña incorrectos',
    //       confirmButtonText: 'Intentar de nuevo',
    //       icon: 'warning'
    //     })
    //   }
    // },
  }
}

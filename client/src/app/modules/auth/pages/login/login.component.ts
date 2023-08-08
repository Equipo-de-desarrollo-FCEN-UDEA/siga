//angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//sweetalert2
import Swal from 'sweetalert2';

//interfaces
import { Auth } from '@interfaces/auth';
import { UserResponse } from '@interfaces/user';
import { UserRolResponse } from '@interfaces/userrol';

//service
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import { UserService } from '@services/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public submitted: boolean = false;
  public loading: boolean = false;
  public form!: FormGroup;
  public error: string = '';
  public activation: boolean = false;
  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });
  public userRoles: UserRolResponse[] = [];
  public selectedRole: UserRolResponse | undefined = undefined;

  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmitLogin() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService.login(this.loginForm.value as Auth).subscribe({
      next: () => {
        this.router.navigate(['/seleccionar-rol']);
        // if (this.userRoles.length > 1) {
        //   console.log('Hemos entrado');
        //   this.router.navigate(['/seleccionar-rol']);
          
        // } else {
        //   this.router.navigate(['/home']);
        // }
        this.loading = false;
      },
      error: (err) => {
        this.activation = true;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  /* this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) { return; }

    this.loading = true;  
    this.authService.login(this.loginForm.value as Auth).subscribe({
      next: () => {
        if (this.userRoles == undefined) {return;}

        if (this.userRoles.length > 1) {
          console.log('Hemos entrado');
          this.router.navigate(['/seleccionar-rol']);
        } else { 
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.activation = true;
      }
    })
    this.loading = false;
  } */
}

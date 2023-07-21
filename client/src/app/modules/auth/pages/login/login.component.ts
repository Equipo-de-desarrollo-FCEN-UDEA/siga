//angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs';

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
import { UserRolService } from '@services/userrol.service';

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
  public userRoles!: UserRolResponse[];

  get f() { return this.loginForm.controls;}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.activateRoute.params.pipe(
        switchMap(params => this.userService.getUser(params['id']))
      ).subscribe({
        next: (user: UserResponse) => {
          this.userRoles = user.userrol;
          console.log(this.userRoles);

          if (this.userRoles.length > 1) {
            this.router.navigate(['/usuarios/seleccionar-rol']);
          } else { this.router.navigate(['/home']); }        
        },
        error: (error: any) => {
          console.log('Error al obtener el usuario', error);
          this.router.navigate(['/usuarios/seleccionar-rol']);
        }
      });
    }
  }
    

  onSubmitLogin() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) { return; }
    this.loading = true;  

    this.authService.login(this.loginForm.value as Auth).subscribe({
      next: () => {
        if (this.userRoles.length > 1) {
          this.router.navigate(['/usuarios/seleccionar-rol']);
        } else { 
          this.router.navigate(['/home']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.activation = true;
        this.loading = false;
      }
    });
  }
}

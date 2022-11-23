//angular
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//sweetalert2
import Swal from 'sweetalert2';

//services
import { UserService } from '@services/user.service';

//data
import { id_type } from '@shared/data/id_type';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public loading: boolean = false;
  public error: string = '';
  public submitted: boolean = false;

  public id_type = id_type
  public createUserForm: FormGroup = this.formBuilder.group({
    last_name: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required]],
    id_type: ['', Validators.required],
    id: ['', Validators.required],
    phone_number: ['', Validators.required],
    rol: ['', Validators.required],
    department_id: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(250)],
    ],
    confirm_password: [],
  });

  get f() { return this.createUserForm.controls; }

  constructor(
    private formBuilder: FormBuilder,

    private ngZone: NgZone,
    private router: Router,

    private userService: UserService
  ) {}

  validatePassword() {
    return (
      this.createUserForm.get('password')?.touched &&
      this.createUserForm.get('password')?.value !=
        this.createUserForm.get('confirm_password')?.value
    );
  }

  onSubmit() {
    this.submitted = true;

    // verificacion de errores
    if (this.createUserForm.invalid) { return; }

    this.userService.postUser(this.createUserForm.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Creado',
          text: res.message,
          icon: 'success',
          confirmButtonColor: '#3AB795',
        });
        //ngZone: facilitate change detection
        this.ngZone.run(() => this.router.navigateByUrl(`/home`));
      },
      error: (err) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
        if (err.status === 400) {
          this.error = err.error.message;
        }
      },
    });
  }
}

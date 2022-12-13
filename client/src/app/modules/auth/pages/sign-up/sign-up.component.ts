//angular
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//sweetalert2
import Swal from 'sweetalert2';

//rxjs
import { Observable } from 'rxjs';

//services
import { UserService } from '@services/user.service';
import { RolService } from '@services/rol.service';
import { DepartmentService } from '@services/department.service';
import { SchoolService } from '@services/school.service';

//interfaces
import { RolBase } from '@interfaces/rol';
import { SchoolResponse } from '@interfaces/school';
import { DepartmentBase, DepartmentInDB } from '@interfaces/department';
import { UserCreate } from '@interfaces/user';

//data
import { id_type } from '@shared/data/id_type';

//shared
import { scale } from '@shared/data/scale';
import { vinculation_type } from '@shared/data/vinculation';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {

  private is_email_valid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/;

  public scale = scale;

  public vinculation_types = vinculation_type;

  public loading: boolean = false;
  public error: string = '';
  public submitted: boolean = false;

  public id_type = id_type;

  public departments$!: Observable<DepartmentInDB[]>;

  public rol$: Observable<RolBase[]> = this.rolService.getExposeRoles();
  public schools$: Observable<SchoolResponse[]> = this.schoolSvc.getExposeSchools();

  public createUserForm: FormGroup = this.formBuilder.group({
    last_names: ['', Validators.required],
    names: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.is_email_valid)]],
    identification_type: ['', Validators.required],
    identification_number: ['', [Validators.required, Validators.pattern("^[A-Z0-9]*$")]],
    phone: ['', Validators.required],
    rol_id: [NaN, Validators.required],
    department_id: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(250)],
    ],
    confirm_password: [],
    scale: ['', Validators.required],
    vinculation_type: ['', Validators.required]
  });


  get f() { return this.createUserForm.controls; }

  constructor(
    private formBuilder: FormBuilder,

    private ngZone: NgZone,
    private router: Router,

    private userService: UserService,
    private rolService: RolService,
    private depatmentService: DepartmentService,
    private schoolSvc: SchoolService
  ) { }

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

    console.log(this.createUserForm.value)

    this.userService.postUser(this.createUserForm.value as UserCreate).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Creado',
          text: res.message,
          icon: 'success',
          confirmButtonColor: '#3AB795',
        });
        //ngZone: facilitate change detection
        this.ngZone.run(() => this.router.navigateByUrl(`../login`));
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

  nextDepartment(event: any) {
    this.departments$ = this.depatmentService.getExposeDepartment(event.target.value as number)
  }
}

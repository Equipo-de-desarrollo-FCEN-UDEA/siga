import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RolBase } from '@interfaces/rol';
import { UserResponse, UserBase, UserUpdate } from '@interfaces/user';
import { DepartmentService } from '@services/department.service';
import { LoaderService } from '@services/loader.service';
import { RolService } from '@services/rol.service';
import { UserService } from '@services/user.service';
import { scale } from '@shared/data/scale';
import { id_type } from '@shared/data/id_type';
import { Observable, take } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {
  public userRolBase!: UserBase;
  public userResponse : UserResponse | undefined;

  public scale = scale
  public id: Number | string = 0;
  public typesId = id_type;
  public isLoading = this.loadingSvc.isLoading;
  public error: string = "";
  public submitted: boolean = false;
  public rol: string = localStorage.getItem('rol') || '';
  public roles$: Observable<RolBase[]>
  private isCorreoValid = /^[a-zA-Z0-9._%+-]+@udea.edu.co$/;
  public getId: Number | string = 0;


  constructor(
    private userSvc: UserService,
    private router: Router,
    private fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    public loadingSvc: LoaderService,
    private departamentosSvc: DepartmentService,
    private rolesSvc: RolService,
    private location: Location
  ) {
    this.roles$ = this.rolesSvc.getRoles();
    this.activateRoute.params.subscribe(params => this.getId = params['id']);

    this.userSvc.getUser(this.getId as number).subscribe({
      next: res => {
        this.userResponse = res;
        this.updateUserBase.patchValue(this.userResponse);
       }
    }
    );
  }

 updateUserBase = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isCorreoValid)]],
    names: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    last_names: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    identification_type: ['', [Validators.required, Validators.maxLength(250)]],
    identification_number: [' ', [Validators.required, Validators.min(1000), Validators.max(999999999999)]],
    phone: [''],
    office: [''],
    vinculation_type: ['', [Validators.required]],
    department_id : [NaN, Validators.required],
    rol_id: [NaN, Validators.required],
    scale: ['', Validators.required]
  });

  ngOnInit(): void {

   
  }

  get f() {
    return this.updateUserBase.controls;
  }

  submitUpdate() {
    console.log('submit')
    // verificacion de errores
    // if (this.updateUserBase.invalid) {
    //   return;
    // }
    const user = this.updateUserBase.value as UserUpdate;
    this.userSvc.putUser(user, this.getId as number)
    .subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Usuario actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['usuarios/ver-usuario', this.getId])
        })
      },
      error: (err: any) => {
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
        if (err.status === 400) {
          this.error = err.error.message;
        }
      }
    }
    );
  }

  cancel() {
    this.location.back();
  }
}
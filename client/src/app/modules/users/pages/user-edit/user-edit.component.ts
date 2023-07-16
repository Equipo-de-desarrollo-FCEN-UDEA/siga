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
import { vinculation_type } from '@shared/data/vinculation';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent {
  public userRolBase!: UserBase;
  public userResponse : UserResponse | undefined;


  public id: Number | string = 0;
  public flag_rol: boolean = false;
  public typesId = id_type;
  public vinculation_types = vinculation_type;
  public scale = scale;
  
  public error: string = "";
  public submitted: boolean = false;
  //public rol: string = localStorage.getItem('rol') || '';
  public rol: string = '';

  public rol$: Observable<RolBase[]> = this.rolService.getRoles();
  private is_email_valid = /^[a-zA-Z0-9._%+-]+@UDEA.EDU.CO$/;
  public getId: Number | string = 0;

  //Properties of rol and userrol
  public dropdownList:any[] = [];
  public selectedItems:any[] = [];
  public dropdownSettings: IDropdownSettings;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    private departamentosSvc: DepartmentService,

    private rolService: RolService,
    private userSvc: UserService,
    private location: Location
  ) {
    this.activateRoute.params.subscribe(params => this.getId = params['id']);
    //List of rols 
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'description',
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Deseleccionar todo',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.rol$.subscribe((roles: RolBase[]) => {
      this.dropdownList = roles;
    });

    this.userSvc.getUser(this.getId as number).subscribe({
      next: res => {
        console.log(res)
        this.userResponse = res;
        this.rol = String(this.userResponse.userrol[0].rol.name);
        this.updateUserBase.patchValue(this.userResponse);
        this.selectedItems = this.userResponse.userrol.map(rol => ({ id: rol.rol_id,
                                                                    name: rol.rol.name,
                                                                    description: rol.rol.description,
                                                                    scope: rol.rol.scope }));
       }
    }
    );
  }

 updateUserBase = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.is_email_valid)]],
    names: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    last_names: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    identification_type: ['', [Validators.required, Validators.maxLength(250)]],
    identification_number: [' ', [Validators.required]],
    phone: [''],
    office: [''],
    vinculation_type: ['', [Validators.required]],
    department_id : [NaN, Validators.required],
    rol_id: [this.selectedItems],
    scale: ['', Validators.required],
    changes_rol: this.flag_rol
  });


  get f() {
    return this.updateUserBase.controls;
  }

  onItemSelect(item:any){
    this.flag_rol = true;

  }

  submitUpdate() {
    // verificacion de errores
    if (this.updateUserBase.invalid) {
      console.log(this.updateUserBase.value)
      console.log('error form')
      return;
    }
    //Review number of rols
    if(this.selectedItems.length==0){
      Swal.fire({
        title: 'Debe agregar al menos un cargo',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        return;
      })
    }
    let user = this.updateUserBase.value as UserUpdate;
    this.userSvc.putUser(user, this.getId as number, this.flag_rol)
    .subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Usuario actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['usuarios/ver/', this.getId])
        })
      },
      error: (err: any) => {
      }
    }
    );
  }

  cancel() {
    this.location.back();
  }
}
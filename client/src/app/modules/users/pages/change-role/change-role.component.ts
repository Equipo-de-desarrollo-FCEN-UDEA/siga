import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRolService } from '@services/user-rol.service';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss'],
})
export class ChangeRoleComponent implements OnInit {
  roles: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,

    private userSvc: UserService,

    private location: Location
  ) {}

  public changeRoleForm = this.fb.group({
    active_rol: [0, Validators.required],
  });

  ngOnInit(): void {
    this.userSvc.getUser().subscribe((res: any) => {
      this.roles = res.userrol;
    });
  }

  onSubmit() {
    this.userSvc
      .changeActiveRole(this.changeRoleForm.value.active_rol)
      .subscribe({
        next: () => {
          Swal.fire({
            title: '¡Rol cambiado!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          });
          this.router.navigate(['/home']);
        },
      });
  }

  cancel() {
    this.location.back();
  }
}

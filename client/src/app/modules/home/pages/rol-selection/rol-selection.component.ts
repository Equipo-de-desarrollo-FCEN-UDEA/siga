// angular and rxjs
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// interfaces and services
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-rol-selection',
  templateUrl: './rol-selection.component.html',
  styleUrls: ['./rol-selection.component.scss'],
})
export class RolSelectionComponent {
  public roles: any[] = [];
  public formSend: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSvc: UserService,
    private authService: AuthService,
    private location: Location
  ) {
    this.userSvc.getUser().subscribe((res: any) => {
      console.log(res);
      this.roles = res.userrol;
      if (this.roles.length <= 1) {
        this.userSvc.changeActiveRole(0).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
        });
      }
    });
  }

  public selectRolForm = this.fb.group({
    active_rol: [0, Validators.required],
  });

  onSubmit() {
    console.log(this.selectRolForm.value.active_rol);
    this.userSvc
      .changeActiveRole(this.selectRolForm.value.active_rol)
      .subscribe({
        next: () => {
          Swal.fire({
            title: '¡Rol seleccionado!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          }).then(() => {
            this.formSend = true;
            this.router.navigate(['/home']);
          });
        },
      });
  }

  onCancel() {
    this.formSend = true;
    this.authService.logOut();
  }
}

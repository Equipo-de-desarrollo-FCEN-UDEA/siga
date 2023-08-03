// angular and rxjs
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// interfaces and services
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-rol-selection',
  templateUrl: './rol-selection.component.html',
  styleUrls: ['./rol-selection.component.scss']
})
export class RolSelectionComponent implements OnInit{
  public roles: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSvc: UserService,
    private location: Location
  ) {}

  public selecRolForm = this.fb.group({
    active_rol: [0, Validators.required],
  });

  ngOnInit(): void {
    this.userSvc.getUser().subscribe((res: any) => {
      console.log(res);
      this.roles = res.userrol;
    });
  }

  onSubmit(){
    console.log(this.selecRolForm.value);
    this.userSvc
      .changeActiveRole(this.selecRolForm.value.active_rol)
      .subscribe({    
        next: () => {
          Swal.fire({
            title: '¡Rol seleccionado!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          });
          this.router.navigate(['/home']);
        },
      });
  }

  onCancel(){
    this.location.back();
  }
}
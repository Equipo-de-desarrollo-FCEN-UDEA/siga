//angular
import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree } from '@angular/router';
import Swal from 'sweetalert2';

//rxjs
import { Observable } from 'rxjs';

//services
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { FormBuilder } from '@angular/forms';

//components
import { RolSelectionComponent } from '@modules/home/pages/rol-selection/rol-selection.component';


@Injectable({
  providedIn: 'root'
})
export class RolSelectionGuard implements CanDeactivate<RolSelectionComponent> {

  constructor(
    private authService: AuthService,
    private userSvc: UserService,
    private fb: FormBuilder
  ){}

  canDeactivate(
    component: RolSelectionComponent): boolean {
      if (component.roles.length <= 1){ return true; }

        if ( !component.formSend ){
          Swal.fire({
          title: '¡Debe seleccionar un rol!',
          icon: 'error',
          confirmButtonText: 'Reintentar',
          confirmButtonColor: '#D33A3A',});
          return false;
        }
        console.log('RolSelectionGuard.canDeactivate()');  
        return true;
  }
}

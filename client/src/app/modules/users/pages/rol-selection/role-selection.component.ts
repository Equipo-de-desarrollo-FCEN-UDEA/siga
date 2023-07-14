import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { UserRolService } from '@services/userrol.service';
import { switchMap} from 'rxjs';


@Component({
  selector: 'app-rol-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss']
})


export class RolSelectionComponent {
  public user: UserResponse | undefined;
  public userResponse!: UserResponse;
  public id: number | string = 0;
  public selectedRol: string | undefined;
  
  constructor(
    private userRolService: UserRolService,
    private activateRoute: ActivatedRoute,
    private location: Location

  ) {
    const userSvc = this.activateRoute.params.pipe(
      switchMap(
        params => {
          this.id = params['id']
          return this.userRolService.getUserRoles(params['id'])
        }
      )
    );
      }

  selectRole(role: string) {
    // Aquí puedes realizar las acciones correspondientes cuando se selecciona un rol,
    // como almacenar la selección en el almacenamiento local o enviarla al servidor.
    console.log('Rol seleccionado:', role);
    // Redirigir al usuario a la siguiente página, por ejemplo:
    // this.router.navigate(['/dashboard']);
  }
  
}



import { Component  } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { take } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})


export class UserViewComponent {
  // public rol : string = localStorage.getItem('rol') || '';
  public user: UserResponse | undefined;
  public actualUser: UserResponse | undefined;
  public userResponse!: UserResponse;
  public id : number | string = 0;
  constructor(
    private userService: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute,  //Preguntar a Jhon

  ) {
    this.activateRoute.params.pipe(take(1)).subscribe(params => this.id = params['id']);
    this.activateRoute.params.subscribe({
      next: (params) => {
      this.userService.getUser(this.id as number).subscribe(
        {
          next: (resUser) => {
          this.user = resUser;
          },
          error: (err) => {
            if (err.status == 401){
            Swal.fire({
              title: 'No autorizado',
              text: 'No estás autorizado para ver este sitio',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            }).then(() => this.router.navigate(['/']));
          }
          }
        }
        
        );
      }
    });
    this.actualUser = this.userService.getActualUser()
   }
}

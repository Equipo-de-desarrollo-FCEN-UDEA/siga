import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { switchMap} from 'rxjs';


@Component({
  selector: 'app-rol-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss']
})


export class RolSelectionComponent {
  //public rol : string = localStorage.getItem('rol') || '';
  public user: UserResponse | undefined;
  public userResponse!: UserResponse;
  public id: number | string = 0;
  public selectedRol: string | undefined;
  
  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private location: Location

  ) {
    const userSvc = this.activateRoute.params.pipe(
      switchMap(
        params => {
          this.id = params['id']
          return this.userService.getUser(params['id'])
        }
      )
    );
    userSvc.subscribe(
      (user) => {
        console.log(user)
        this.user = user
      }
    );
  }


  cancel() {
    this.location.back();
  }
}

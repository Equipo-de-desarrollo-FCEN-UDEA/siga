import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '@interfaces/user';
import { UserService } from '@services/user.service';
import { switchMap} from 'rxjs';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})


export class UserViewComponent {
  // public rol : string = localStorage.getItem('rol') || '';
  public user: UserResponse | undefined;
  public userResponse!: UserResponse;
  public id: number | string = 0;
  public userrol: string ="";

  constructor(
    private userService: UserService,

    private activateRoute: ActivatedRoute,  //Preguntar a Jhon
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
        this.user = user
        this.userrol=this.user.userrol[user.active_rol].rol.name;
      }
    );
  }


  cancel() {
    this.location.back();
  }
}

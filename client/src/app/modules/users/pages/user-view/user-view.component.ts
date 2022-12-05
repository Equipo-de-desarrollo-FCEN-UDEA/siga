import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBase, UserResponse } from '@interfaces/user';
import { LoaderService } from '@services/loader.service';
import { UserService } from '@services/user.service';
import { Observable, switchMap, take } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})


export class UserViewComponent implements OnInit {
  // public rol : string = localStorage.getItem('rol') || '';
  public user: UserResponse | undefined;
  public userResponse!: UserResponse;
  public id: number | string = 0;
  constructor(
    private userService: UserService,
    private router: Router,
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
      }
    );
  }

  ngOnInit(): void {

  }

  cancel() {
    this.location.back();
  }
}

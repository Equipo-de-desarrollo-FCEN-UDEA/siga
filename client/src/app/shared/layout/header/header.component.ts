//Imports Angular
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
//rxjs
import { filter } from 'rxjs/internal/operators/filter';
//interfaces
import { UserBase, UserResponse } from '@interfaces/user';
//services
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public user$: Observable<UserResponse>;
  public activeRol: number = 0;
  public currentURL: any;
  public isSuperUser = this.authService.isSuperUser$;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.isSuperUser();

    this.router.events
      .pipe(filter((res) => res instanceof NavigationEnd))
      .subscribe(() => {
        this.currentURL = this.router.url;
      });

    this.user$ = this.userService.getUser()
    this.userService.getUser().subscribe((user: UserResponse) => {
        this.activeRol = user.active_rol;
    });
  }

  isRolSelectionRoute(): boolean {
    return this.router.url.includes('/seleccionar-rol');
  }

  logOut() {
    this.authService.logOut();
  }

}

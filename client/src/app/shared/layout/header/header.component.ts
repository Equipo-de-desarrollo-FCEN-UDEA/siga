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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public user: UserResponse | undefined;
  public user_response: UserResponse | undefined;
  public currentURL: any;
  public isSuperUser = this.authService.isSuperUser$;

  constructor(
    private router     : Router, 
    private userService: UserService,
    private authService: AuthService
  ) {
    this.authService.isSuperUser();

    this.router.events
      .pipe(filter((res) => res instanceof NavigationEnd))
      .subscribe(() => {
        this.currentURL = this.router.url;
      });

    this.userService.getUser().subscribe((resUser) => {
      this.user = resUser;
    });
  }

  logOut() {
    this.authService.logOut();
  }

}

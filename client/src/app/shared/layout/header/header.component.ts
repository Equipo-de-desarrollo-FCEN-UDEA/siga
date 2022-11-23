//Imports Angular
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
//rxjs
import { filter } from 'rxjs/internal/operators/filter';
//interfaces
import { UserBase } from '@interfaces/user';
//services
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public user: UserBase | undefined; 
  public currentURL: any;

  constructor(
    private router     : Router, 
    private userService: UserService,
    private authService: AuthService
  ) {

    this.router.events
      .pipe(filter((res) => res instanceof NavigationEnd))
      .subscribe(() => {
        this.currentURL = this.router.url;
      });

    this.userService.getUsers().subscribe((resUser) => {
      //this.user = resUser;
    });
  }

  logOut() {
    this.authService.logOut();
  }

}

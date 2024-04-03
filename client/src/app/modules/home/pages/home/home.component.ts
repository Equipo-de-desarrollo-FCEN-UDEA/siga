//angular
import { Component } from '@angular/core';

//services
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  public isSuperUser = this.authSvc.isSuperUser$;

  constructor(private authSvc:AuthService ) {
    this.authSvc.isSuperUser();
  }

}

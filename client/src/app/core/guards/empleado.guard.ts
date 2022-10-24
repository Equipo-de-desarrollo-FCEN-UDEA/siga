import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authSvc.isLoggedIn()){
        this.router.navigate(['/login']);
      }
      return this.authSvc.isLoggedIn();
  }
  
}

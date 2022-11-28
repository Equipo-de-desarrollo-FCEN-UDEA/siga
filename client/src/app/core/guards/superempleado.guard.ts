//angular
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

//rxjs
import { Observable } from 'rxjs';

//services
import { AuthService } from '@services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class SuperempleadoGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authSvc.isSuperUser();

    let isSuperUser$ = this.authSvc.isSuperUser$;

    isSuperUser$.subscribe((data) => {
      if (!data) {
        this.router.navigate(['/empleados/ver/0']);
      }
    });

    return isSuperUser$;
  }
}

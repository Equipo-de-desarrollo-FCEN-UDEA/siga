import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { FullTimeComponent } from '@modules/applications/pages/edit/components/full-time/full-time.component';
import { CommissionComponent } from '@modules/applications/pages/edit/components/commission/commission.component';
import { EconomicSupportComponent } from '@modules/applications/pages/edit/components/economic-support/economic-support.component';
import { HourAvalComponent } from '@modules/applications/pages/edit/components/hour-aval/hour-aval.component';
import { PermissionComponent } from '@modules/applications/pages/edit/components/permission/permission.component';
import { VacationComponent } from '@modules/applications/pages/edit/components/vacation/vacation.component';

@Injectable({
  providedIn: 'root',
})
export class EditViewGuard implements CanActivate {
  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (route.component === VacationComponent) {
      console.log(state.url.);

      return false;
    } else {
      return true;
    }
  }
}

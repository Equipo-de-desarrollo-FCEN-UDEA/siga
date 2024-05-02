import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { lastElement } from '@shared/utils';

import { VacationService } from "@services/applications/vacation.service";
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class EditViewGuard implements CanActivate{

  constructor(private vacationService: VacationService, private router: Router, private route: ActivatedRoute,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const id = parseInt(route.paramMap.get('id') ?? '');

    const applicationStatus: { [key: string]: string } = {
      solicitada: "SOLICITADA",
      enCreacion: "EN CREACION",
      devuelta: "DEVUELTA",
    };
    
    // Aquí realizamos la llamada al servicio y retornamos una Promise<boolean>
    return new Promise<boolean>((resolve, reject) => {
      this.vacationService.getVacation(id).subscribe(data => {
        let currentStatus = data.application_status[0].status.name;
 
        currentStatus = lastElement(
          data.application_status
        ).status.name;

        const isStatusAllowed = Object.values(applicationStatus).some((status) => status === currentStatus);
               
        if (!isStatusAllowed) {
          resolve(false); 
        } else {
          resolve(true); 
        }
      }, error => {
        console.error("Error al obtener el estado de la solicitud:", error);
        resolve(true);
      });
    });
  }
}


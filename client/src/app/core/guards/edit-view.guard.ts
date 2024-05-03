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

import { VacationService } from '@services/applications/vacation.service';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { CommissionService } from '@services/applications/commission.service';
import { HourAvalService } from '@services/applications/hour-aval.service';
import { EconomicSupportService } from '@services/applications/economic-support.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EditViewGuard implements CanActivate {
  constructor(
    private vacationService: VacationService,
    private fullTimeService: FullTimeService,
    private commissionService: CommissionService,
    private hourAvalService: HourAvalService,
    private economicSupportService: EconomicSupportService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const id = parseInt(route.paramMap.get('id') ?? '');

    const applicationTypes: string[] = [
      'vacaciones',
      'dedicacion',
      'comision',
      'avalhoras',
      'apoyo-economico',
    ];

    const applicationStatusAllowed: string[] = [
      'SOLICITADA',
      'EN CREACIÓN',
      'DEVUELTA',
    ];

    const currentApplication = () => {
      const url = state.url.split('/');
      const urlFragmented = url[url.length - 1];

      return urlFragmented;
    };

    const currentStatusValidation = (data: any) => {
      let currentStatus = data.application_status[0].status.name;
      currentStatus = lastElement(data.application_status).status.name;

      const isStatusAllowed = applicationStatusAllowed.includes(currentStatus);

      if (!isStatusAllowed) {
        return false;
      }

      return true;
    };

    const serviceRequest = (service: any, methodName: string) => {
      return new Promise<boolean>((resolve, reject) => {
        service[methodName](id).subscribe(
          (data: any) => {
            let currentStatus = data.application_status[0].status.name;
            currentStatus = lastElement(data.application_status).status.name;

            currentStatusValidation(data)
              ? resolve(true)
              : Swal.fire({
                  title: `Cuando la solicitud está en el estado de ${currentStatus} no se puede editar`,
                  icon: 'warning',
                  confirmButtonText: 'Aceptar',
                });
          },
          (error: any) => {
            console.error('Error al obtener el estado de la solicitud:', error);
            resolve(true);
          }
        );
      });
    };

    switch (currentApplication()) {
      case applicationTypes[0]:
        return serviceRequest(this.vacationService, 'getVacation');

      case applicationTypes[1]:
        return serviceRequest(this.fullTimeService, 'getFullTime');

      case applicationTypes[2]:
        return serviceRequest(this.commissionService, 'getCommission');

      case applicationTypes[3]:
        return serviceRequest(this.hourAvalService, 'getHourAval');

      case applicationTypes[4]:
        return serviceRequest(
          this.economicSupportService,
          'getEconomicSupport'
        );

      default:
        return true;
    }
  }
}

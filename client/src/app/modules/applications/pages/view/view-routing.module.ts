import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionComponent } from './components/commission/commission.component';
import { FullTimeComponent } from './components/full-time/full-time.component';
import { HourAvalComponent } from './components/hour-aval/hour-aval.component';
import { PermissionComponent } from './components/permission/permission.component';
import { ViewComponent } from './view.component';
import { VacationComponent } from './components/vacation/vacation.component';
import { EconomicSupportComponent } from './components/economic-support/economic-support.component';

const routes: Routes = [
  {
    path: ':id',
    component: ViewComponent,
    children: [
      {
        path: 'permiso',
        component: PermissionComponent,
        data: {
          title: 'Permiso'
        }
      },
      {
        path: 'comision',
        component: CommissionComponent,
        data: {
          title: 'Comisión'
        }
      },
      {
        path: 'dedicacion',
        component: FullTimeComponent,
        data: {
          title: 'Dedicación Exclusiva'
        }
      },
      {
        path: 'avalhoras',
        component: HourAvalComponent,
        data: {
          title: 'Aval de horas para grupos de investigación'
        }
      },
      {
        path: 'vacaciones',
        component: VacationComponent,
        data: {
          title: 'Vacaciones'
        }
      },
      {
        path: 'apoyo economico',
        component: EconomicSupportComponent,
        data: {
          title: 'Apoyo Económico'
        }
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'prefix'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'prefix'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }

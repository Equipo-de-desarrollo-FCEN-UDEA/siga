import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit.component';
import { PermissionComponent } from './components/permission/permission.component';
import { CommissionComponent } from './components/commission/commission.component';
import { FullTimeComponent } from './components/full-time/full-time.component';
import { HourAvalComponent } from './components/hour-aval/hour-aval.component';
import { VacationComponent } from './components/vacation/vacation.component';

const routes: Routes = [
  { 
    path: ':id', 
    component: EditComponent,
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
        path: 'carta-inicio',
        component: FullTimeComponent,
        data: {
          title: 'Carta de Inicio'
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
          title: 'Solicitud de vacaciones'
        }
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'prefix'
      },
    ],
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
export class EditRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionComponent } from './components/commission/commission.component';
import { ComplimentComponent } from './components/compliment/compliment.component';
import { WorkplanComponent } from './components/full-time/pages/workplan/workplan.component';
import { HourAvalComponent } from './components/hour-aval/hour-aval.component';
import { PermissionComponent } from './components/permission/permission.component';
import { CreateComponent } from './create.component';

const routes: Routes = [
  { 
    path: '', 
    component: CreateComponent,
    children: [
      //permiso
      {
        path: 'permiso',
        component: PermissionComponent,
        data: {
          title: 'Permiso',
          button: 'Solicitar'
        },
      },
      //comision
      {
        path: 'comision',
        component: CommissionComponent,
        data: {
          title: 'Comisión',
          button: 'Solicitar'
        }
      },
      {
        path: 'plan-de-trabajo',
        component: WorkplanComponent
      },
      {
        path: 'cumplido/:id',
        component: ComplimentComponent,
        data: {
          title: 'Cumplido',
          button: 'Enviar cumplido'
        }
      },
      {
        path: 'avalhoras',
        component: HourAvalComponent,
        data: {
          title: 'Aval de horas para grupos de investigación',
          button: 'Iniciar'
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
export class CreateRoutingModule { }

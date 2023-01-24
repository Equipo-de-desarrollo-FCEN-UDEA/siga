//ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// PERMISO COMPONENT
import { PermissionComponent } from './components/permission/permission.component';

//COMISION COMPONENT
import { CommissionComponent } from './components/commission/commission.component';

//CUMPLIDO COMPONENT
import { ComplimentComponent } from './components/compliment/compliment.component';

//DEDICACION EXCLUSIVA COMPONENTS
import { FullTimeComponent } from './components/full-time/full-time.component';
import { StartLetterComponent } from './components/full-time/pages/start-letter/start-letter.component';
import { WorkplanComponent } from './components/full-time/pages/workplan/workplan.component';

//CREATE COMPONENT
import { CreateComponent } from './create.component';
import { FullTimeFormatComponent } from './components/full-time/pages/full-time-format/full-time-format.component';

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
        },
      },
      //comision
      {
        path: 'comision',
        component: CommissionComponent,
        data: {
          title: 'Comisión',
        },
      },

      //DEDICACION EXCLUSIVA
      {
        path: 'dedicacion',
        component: FullTimeComponent,
        data: {
          title: 'Dedicación Exclusiva',
        },
      },
      {
        path: 'plan-de-trabajo/:id',
        component: WorkplanComponent,
      },
      {
        path: 'carta-inicio/:id',
        component: StartLetterComponent,
      },
      {
        path: 'formato-vicerrectoria/:id',
        component: FullTimeFormatComponent,
      },

      //CUMPLIDOS
      {
        path: 'cumplido/:id',
        component: ComplimentComponent,
        data: {
          title: 'Cumplido',
        },
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'prefix',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}

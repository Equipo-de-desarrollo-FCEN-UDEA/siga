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
import { ViceFormatComponent } from './components/full-time/pages/viceformat/viceformat.component';
import { WorkplanComponent } from './components/full-time/pages/workplan/workplan.component';

//CREATE COMPONENT
import { CreateComponent } from './create.component';
import { HourAvalComponent } from './components/hour-aval/hour-aval.component';
import { VacationComponent } from './components/vacation/vacation.component';

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
          title: 'Permiso'
        },
      },
      //comision
      {
        path: 'comision',
        component: CommissionComponent,
        data: {
          title: 'Comisión'
        },
      },

      //DEDICACION EXCLUSIVA
      {
        path: 'dedicacion',
        component: FullTimeComponent,
        data: {
          title: 'Dedicación Exclusiva',
          button: 'Iniciar'
        },
      },
      //AVAL DE HORAS
      {
        path: 'avalhoras',
        component: HourAvalComponent,
        data: {
          title: 'Aval de horas para grupos de investigación',
          button: 'Iniciar'
        }
      },
      //Vacaciones
      {
        path: 'vacation',
        component: VacationComponent
      },
      //  Formularios extras
      {
        path: 'plan-de-trabajo/:id',
        component: WorkplanComponent,
      },
      {
        path: 'carta-inicio/:id',
        component: StartLetterComponent,
      },
      //CUMPLIDOS
      {
        path: 'formatovice/:id',
        component: ViceFormatComponent,
        data: {
          title: 'Formato de Vicerrectoría Administrativa'
        }
      },
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
export class CreateRoutingModule { }

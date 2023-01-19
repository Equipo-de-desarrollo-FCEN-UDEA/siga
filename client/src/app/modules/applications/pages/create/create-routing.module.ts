import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionComponent } from './components/commission/commission.component';
import { ComplimentComponent } from './components/compliment/compliment.component';
import { FullTimeComponent } from './components/full-time/full-time.component';
import { ViceFormatComponent } from './components/full-time/pages/viceformat/viceformat.component';
import { WorkplanComponent } from './components/full-time/pages/workplan/workplan.component';
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
          title: 'Permiso'
        },
      },
      //comision
      {
        path: 'comision',
        component: CommissionComponent,
        data: {
          title: 'Comisión'
        }
      },
      {
        path: 'plan-de-trabajo',
        component: WorkplanComponent
      },
      {
        path: 'dedicacion',
        component: FullTimeComponent,
        data: {
          title: 'Dedicación Exclusiva'
        }
      },
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
          title: 'Cumplido'
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

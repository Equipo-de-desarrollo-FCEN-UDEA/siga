import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionComponent } from './components/commission/commission.component';
import { ComplimentComponent } from './components/compliment/compliment.component';
import { FullTimeComponent } from './components/full-time/full-time.component';
import { WorkplanComponent } from './components/full-time/pages/workplan/workplan.component';
import { PermissionComponent } from './components/permission/permission.component';
import { CreateComponent } from './create.component';

const routes: Routes = [
  { 
    path: '', 
    component: CreateComponent,
    children: [
      {
        path: 'dedicacion', 
        loadChildren: () => import('./components/full-time/full-time.module')
        .then(m => m.FullTimeModule) 
      },
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

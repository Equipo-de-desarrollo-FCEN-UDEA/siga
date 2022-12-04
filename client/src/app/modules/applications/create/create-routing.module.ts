import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionComponent } from './components/commission/commission.component';
import { ComplimentComponent } from './components/compliment/compliment.component';
import { PermissionComponent } from './components/permission/permission.component';
import { CreateComponent } from './create.component';

const routes: Routes = [
  { 
    path: '', 
    component: CreateComponent,
    children: [
      //permiso
      {
        path: '1',
        component: PermissionComponent,
        data: {
          title: 'Permiso'
        }
      },
      //comision
      {
        path: '2',
        component: CommissionComponent,
        data: {
          title: 'Comisión'
        }
      },
      {
        path: 'cumplido/:id',
        component: ComplimentComponent,
        data: {
          title: 'Cumplido'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }

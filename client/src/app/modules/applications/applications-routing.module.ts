import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoGuard } from 'src/app/core/guards/empleado.guard';
import { ApplicationListComponent } from './application-list/application-list.component';

const routes: Routes = [
 
  {
    path: 'lista',
    canActivate: [EmpleadoGuard],
    component: ApplicationListComponent
  },
  {
    path: 'ver', 
    canActivate: [EmpleadoGuard],
    loadChildren: () => import('./view/view.module')
    .then(m => m.ViewModule) 
  },
  {
    path: 'crear', 
    canActivate: [EmpleadoGuard],
    loadChildren: () => import('./create/create.module')
    .then(m => m.CreateModule) 
  },
  {
    path: 'editar', 
    canActivate: [EmpleadoGuard],
    loadChildren: () => import('./edit/edit.module')
    .then(m => m.EditModule) 
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }

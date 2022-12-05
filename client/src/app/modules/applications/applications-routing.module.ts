import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './application-list/application-list.component';

const routes: Routes = [
 
  {
    path: 'lista',
    component: ApplicationListComponent
  },
  
  { 
    path: 'ver', 
    loadChildren: () => import('./view/view.module')
    .then(m => m.ViewModule) 
  },
  { 
    path: 'crear', 
    loadChildren: () => import('./create/create.module')
    .then(m => m.CreateModule) },
  { 
    path: 'editar', 
    loadChildren: () => import('./edit/edit.module')
    .then(m => m.EditModule) 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@shared/pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'usuarios', 
    loadChildren: () => import('./modules/users/users.module')
    .then(m => m.UsersModule) 
  },
  { path: 'solicitudes', loadChildren: () => import('./modules/applications/applications.module').then(m => m.ApplicationsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

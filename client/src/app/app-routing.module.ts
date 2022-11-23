//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const ROUTES: Routes = [
  { 
    path: 'usuarios', 
    loadChildren: () => import('./modules/users/users.module')
    .then(m => m.UsersModule) 
  },
  { 
    path: 'solicitudes', 
    loadChildren: () => import('./modules/applications/applications.module')
    .then(m => m.ApplicationsModule) 
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
    .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

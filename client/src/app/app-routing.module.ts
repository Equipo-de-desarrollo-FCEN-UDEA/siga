//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from '@shared/pages/activate-account/activate-account.component';
import { LoginComponent } from '@shared/pages/login/login.component';
import { ResetPasswordComponent } from '@shared/pages/reset-password/reset-password.component';


const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'recuperar-contrasena/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'confirmar-correo/:token',
    component: ActivateAccountComponent
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

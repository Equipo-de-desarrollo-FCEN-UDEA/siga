//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';

//component
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResendEmailComponent } from './pages/resend-email/resend-email.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { RolSelectionComponent } from '@modules/home/pages/rol-selection/rol-selection.component';

const ROUTES: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'sign-up', 
    component: SignUpComponent 
  },
  { 
    path: 'forgot-password', 
    component: ForgotPasswordComponent 
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent 
  },
  {
    path: 'recuperar-contrasena/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'confirmar-correo/:token',
    component: ActivateAccountComponent
  },
  {
    path: 'reenviar-correo-activacion',
    component: ResendEmailComponent
  },
  {
    path: 'seleccionar-role',
    component: RolSelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
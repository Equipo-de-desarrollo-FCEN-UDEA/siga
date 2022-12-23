//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//routing
import { AuthRoutingModule } from './auth-routing.module';

//component
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { ResendEmailComponent } from './pages/resend-email/resend-email.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    ResetPasswordComponent,
    ActivateAccountComponent,
    ResendEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }

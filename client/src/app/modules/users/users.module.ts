import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { SharedModule } from '@shared/shared.module';
import { NewPasswordComponent } from './pages/new-password/new-password.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserViewComponent,
    UserEditComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }

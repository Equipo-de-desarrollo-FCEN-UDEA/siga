import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChangeRoleComponent } from './pages/change-role/change-role.component';  

@NgModule({
  declarations: [
    UserListComponent,
    UserViewComponent,
    UserEditComponent,
    NewPasswordComponent,
    ChangeRoleComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class UsersModule { }

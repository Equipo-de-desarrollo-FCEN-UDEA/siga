import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { SuperempleadoGuard } from 'src/app/core/guards/superempleado.guard';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ChangeRoleComponent } from './pages/change-role/change-role.component';

const routes: Routes = [
  {
    path: 'lista',
    canActivate: [SuperempleadoGuard],
    component: UserListComponent
  },
  {
    path: 'ver/:id',
    component: UserViewComponent
  },
  {
    path: 'editar/:id',
    component: UserEditComponent
  },
  {
    path: 'editar-contrasena',
    component: NewPasswordComponent
  },
  {
    path: 'cambiar-rol',
    component: ChangeRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

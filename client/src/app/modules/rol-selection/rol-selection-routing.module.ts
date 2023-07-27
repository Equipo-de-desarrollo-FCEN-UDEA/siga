import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolSelectionComponent } from './pages/login-selection/login-selection.component';

const routes: Routes = [
  {
    path: 'seleccionar-rol',
    component: RolSelectionComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RolSelectionRoutingModule { }

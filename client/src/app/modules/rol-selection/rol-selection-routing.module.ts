import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolSelectionComponent } from './pages/login-selection/login-selection.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';

const routes: Routes = [
  {
    path: 'seleccionar-rol',
    component: RolSelectionComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'prefix'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  exports: [RouterModule]
})
export class RolSelectionRoutingModule { }

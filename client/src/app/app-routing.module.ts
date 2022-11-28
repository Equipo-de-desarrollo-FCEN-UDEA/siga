//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoGuard } from './core/guards/empleado.guard';

const ROUTES: Routes = [
  {

    path: 'usuarios',
    //canActivate: [EmpleadoGuard],
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'solicitudes',
    //canActivate: [EmpleadoGuard],
    loadChildren: () =>
      import('./modules/applications/applications.module').then(
        (m) => m.ApplicationsModule
      ),
  },
  {
    path: 'home',
    //canActivate: [EmpleadoGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) 
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: '/home/home', pathMatch: 'full' },
  {
    path: '**', redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

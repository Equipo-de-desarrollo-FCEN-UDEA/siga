//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'solicitudes',
    loadChildren: () =>
      import('./modules/applications/applications.module').then(
        (m) => m.ApplicationsModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

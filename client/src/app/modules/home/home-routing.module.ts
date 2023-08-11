//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { HomeComponent } from './pages/home/home.component';
import { CreateApplicationComponent } from './pages/create-application/create-application.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { EmpleadoGuard } from 'src/app/core/guards/empleado.guard';
import { RolSelectionComponent } from './pages/rol-selection/rol-selection.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'create-application', component: CreateApplicationComponent },
  { path: 'seleccionar-rol', component: RolSelectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

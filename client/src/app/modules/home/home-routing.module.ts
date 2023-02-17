//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { HomeComponent } from './pages/home/home.component';
import { CreateApplicationComponent } from './pages/create-application/create-application.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { SignatureComponent } from '@shared/components/signature/signature.component';
import { EmpleadoGuard } from 'src/app/core/guards/empleado.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'create-application', component: CreateApplicationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

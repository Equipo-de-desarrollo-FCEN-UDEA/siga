//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { HomeComponent } from './pages/home/home.component';
import { CreateApplicationComponent } from './pages/create-application/create-application.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'create-application', component: CreateApplicationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

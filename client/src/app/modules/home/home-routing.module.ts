//angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

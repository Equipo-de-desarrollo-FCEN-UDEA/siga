//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//routing
import { HomeRoutingModule } from './home-routing.module';

//component
import { HomeComponent } from './pages/home/home.component';
import { CreateApplicationComponent } from './pages/create-application/create-application.component';
import { SharedModule } from '@shared/shared.module';
import { RolSelectionComponent } from './pages/rol-selection/rol-selection.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateApplicationComponent,
    RolSelectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }

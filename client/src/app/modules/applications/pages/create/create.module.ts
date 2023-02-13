import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { CommissionComponent } from './components/commission/commission.component';
import { PermissionComponent } from './components/permission/permission.component';
import { SharedModule } from '@shared/shared.module';
import { ComplimentComponent } from './components/compliment/compliment.component';
import { HourAvalComponent } from './components/hour-aval/hour-aval.component';
import { FullTimeModule } from './components/full-time/full-time.module';
import { VacationComponent } from './components/vacation/vacation.component';



@NgModule({
  declarations: [
    CreateComponent,
    CommissionComponent,
    PermissionComponent,
    ComplimentComponent,
    HourAvalComponent,
    VacationComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule,
    FullTimeModule
  ]
})
export class CreateModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { PermissionComponent } from './components/permission/permission.component';
import { CommissionComponent } from './components/commission/commission.component';
import { SharedModule } from '@shared/shared.module';
import { ComplimentComponent } from '../create/components/compliment/compliment.component';
import { FullTimeComponent } from './components/full-time/full-time.component';
import { HourAvalComponent } from './components/hour-aval/hour-aval.component';
import { VacationComponent } from './components/vacation/vacation.component';
import { EconomicSupportComponent } from './components/economic-support/economic-support.component';


@NgModule({
  declarations: [
    ViewComponent,
    PermissionComponent,
    CommissionComponent,
    FullTimeComponent,
    HourAvalComponent,
    VacationComponent,
    EconomicSupportComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule
  ]
})
export class ViewModule { }

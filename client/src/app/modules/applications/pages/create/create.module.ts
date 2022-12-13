import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { CommissionComponent } from './components/commission/commission.component';
import { PermissionComponent } from './components/permission/permission.component';
import { SharedModule } from '@shared/shared.module';
import { ComplimentComponent } from './components/compliment/compliment.component';

//Dedicacion Exclusiva 
import { FullTimeComponent } from './components/full-time/full-time.component';
import { StartLetterComponent } from './components/full-time/pages/start-letter/start-letter.component';
import { WorkplanComponent } from './components/full-time/pages/workplan/workplan.component';
import { InstitutionalDevelopmentPlanComponent } from './components/full-time/pages/institutional-development-plan/institutional-development-plan.component';
import { FullTimeFormatComponent } from './components/full-time/pages/full-time-format/full-time-format.component';
import { StatusComponent } from './components/full-time/pages/status/status.component';


@NgModule({
  declarations: [
    CreateComponent,
    CommissionComponent,
    PermissionComponent,
    ComplimentComponent,
    FullTimeComponent,
    StartLetterComponent,
    WorkplanComponent,
    InstitutionalDevelopmentPlanComponent,
    FullTimeFormatComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule
  ]
})
export class CreateModule { }

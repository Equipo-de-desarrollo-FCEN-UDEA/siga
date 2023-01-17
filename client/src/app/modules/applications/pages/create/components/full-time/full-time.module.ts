import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullTimeRoutingModule } from './full-time-routing.module';
import { FullTimeFormatComponent } from './pages/full-time-format/full-time-format.component';
import { FullTimeComponent } from './full-time.component';
import { InstitutionalDevelopmentPlanComponent } from './pages/institutional-development-plan/institutional-development-plan.component';
import { StartLetterComponent } from './pages/start-letter/start-letter.component';
import { StatusComponent } from './pages/status/status.component';
import { WorkplanComponent } from './pages/workplan/workplan.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    FullTimeComponent,
    StartLetterComponent,
    WorkplanComponent,
    InstitutionalDevelopmentPlanComponent,
    FullTimeFormatComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    FullTimeRoutingModule,
    SharedModule,
  ]
})
export class FullTimeModule { }
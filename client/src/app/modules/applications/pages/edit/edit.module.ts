import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { CommissionComponent } from './components/commission/commission.component';
import { PermissionComponent } from './components/permission/permission.component';
import { SharedModule } from '@shared/shared.module';
import { FullTimeComponent } from './components/full-time/full-time.component';
import { HourAvalComponent } from './components/hour-aval/hour-aval.component';
import { VacationComponent } from './components/vacation/vacation.component';
import {  SignaturePadModule } from 'angular2-signaturepad';
import { EconomicSupportComponent } from './components/economic-support/economic-support.component';


@NgModule({
  declarations: [
    EditComponent,
    CommissionComponent,
    PermissionComponent,
    FullTimeComponent,
    HourAvalComponent,
    VacationComponent,
    EconomicSupportComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    SharedModule,
    SignaturePadModule
  ]
})
export class EditModule { }

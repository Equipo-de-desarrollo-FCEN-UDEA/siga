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
import { SignaturePadModule } from 'angular2-signaturepad';
import { EconomicSupportModule } from './components/economic-support/economic-support.module';

@NgModule({
  declarations: [
    EditComponent,
    CommissionComponent,
    PermissionComponent,
    FullTimeComponent,
    HourAvalComponent,
    VacationComponent,
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    SharedModule,
    SignaturePadModule,
    EconomicSupportModule,
  ],
})
export class EditModule {}

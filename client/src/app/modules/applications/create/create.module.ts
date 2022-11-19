import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { CommissionComponent } from './components/commission/commission.component';
import { PermissionComponent } from './components/permission/permission.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CreateComponent,
    CommissionComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule
  ]
})
export class CreateModule { }

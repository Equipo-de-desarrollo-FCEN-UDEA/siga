import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { CommissionComponent } from './components/commission/commission.component';
import { PermissionComponent } from './components/permission/permission.component';
import { SharedModule } from '@shared/shared.module';
import { ComplimentComponent } from './components/compliment/compliment.component';
import { FullTimeModule } from './components/full-time/full-time.module';



@NgModule({
    declarations: [
        CreateComponent,
        CommissionComponent,
        PermissionComponent,
        ComplimentComponent,
    ],
    imports: [
        CommonModule,
        CreateRoutingModule,
        SharedModule,
        FullTimeModule
    ]
})
export class CreateModule { }

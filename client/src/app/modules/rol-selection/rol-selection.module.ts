//angular and rxjs
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RolSelectionRoutingModule } from './rol-selection-routing.module';
import { RolSelectionComponent } from './pages/login-selection/login-selection.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        RolSelectionComponent
    ],
    imports: [
        CommonModule,
        RolSelectionRoutingModule,
        RouterModule,
        SharedModule,
        FormsModule
    ]
})
  export class RolSelectionModule { }
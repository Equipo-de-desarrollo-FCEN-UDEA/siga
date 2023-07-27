//angular and rxjs
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RolSelectionRoutingModule } from './rol-selection-routing.module';
import { RolSelectionComponent } from './pages/login-selection/login-selection.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        RolSelectionRoutingModule,
        RouterModule,
        SharedModule
    ]
})
  export class ApplicationsModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationsRoutingModule } from './confirmations-routing.module';
import { HoursAvalComponent } from './components/aval-horas/hours-aval.component';


@NgModule({
  declarations: [
    HoursAvalComponent
  ],
  imports: [
    CommonModule,
    ConfirmationsRoutingModule
  ]
})
export class ConfirmationsModule { }

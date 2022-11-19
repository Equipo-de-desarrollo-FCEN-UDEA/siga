import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { StatusHistoryComponent } from './components/status-history/status-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    StatusHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    StatusHistoryComponent,
    NgbModule,
    FormsModule
  ]
})
export class SharedModule { }

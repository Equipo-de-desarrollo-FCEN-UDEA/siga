//Angular Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


//Modules
import { SharedRoutingModule } from './shared-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//Components
import { StatusHistoryComponent } from './components/status-history/status-history.component';

@NgModule({
  declarations: [
    StatusHistoryComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    StatusHistoryComponent,
    FormsModule,
    NgbModule
  ]
})
export class SharedModule { }

//Angular Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { SharedRoutingModule } from './shared-routing.module';

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
  ]
})
export class SharedModule { }

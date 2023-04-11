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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { ApplicantsComponent } from './components/applicants/applicants.component';
import { SignaturePadModule } from 'angular2-signaturepad';


@NgModule({
  declarations: [
    StatusHistoryComponent,
    NotFoundComponent,
    LoaderComponent,
    StepperComponent,
    ApplicantsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CdkStepperModule,
    SignaturePadModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    StatusHistoryComponent,
    FormsModule,
    NgbModule,
    LoaderComponent,
    StepperComponent,
    CdkStepperModule,
    ApplicantsComponent
  ]
})
export class SharedModule { }

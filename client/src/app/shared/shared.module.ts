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
import { UserApplicationStatusComponent } from './components/user-application-status/user-application-status.component';
import { DatePickerRangeComponent } from './components/date-picker-range/date-picker-range.component';
import { DatePickerBasicComponent } from './components/date-picker-basic/date-picker-basic.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    StatusHistoryComponent,
    NotFoundComponent,
    LoaderComponent,
    StepperComponent,
    ApplicantsComponent,
    UserApplicationStatusComponent,
    DatePickerRangeComponent,
    DatePickerBasicComponent,
    FileUploadComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CdkStepperModule,
    SignaturePadModule,
    NgbModule,
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    StatusHistoryComponent,
    UserApplicationStatusComponent,
    FormsModule,
    NgbModule,
    LoaderComponent,
    StepperComponent,
    CdkStepperModule,
    ApplicantsComponent,
    SignaturePadModule,
    DatePickerRangeComponent,
    FileUploadComponent,
    PaginationComponent
  ],
})
export class SharedModule {}

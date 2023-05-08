import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EconomicSupportRoutingModule } from './economic-support-routing.module';
import { ApplicationDataComponent } from './pages/application-data/application-data.component';
import { EconomicSupportComponent } from './economic-support.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvanceComponent } from './pages/advance/advance.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EconomicSupportComponent,
    ApplicationDataComponent,
    PersonalDataComponent,
    TicketsComponent,
    AdvanceComponent,
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    EconomicSupportRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApplicationDataComponent,
    PersonalDataComponent,
    TicketsComponent,
    AdvanceComponent,
    DocumentsComponent
  ]
})
export class EconomicSupportModule { }

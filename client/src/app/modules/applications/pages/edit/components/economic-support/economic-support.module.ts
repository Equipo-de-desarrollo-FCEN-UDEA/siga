import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EconomicSupportComponent } from './economic-support.component';
import { AdvanceComponent } from './pages/advance/advance.component';
import { ApplicationDataComponent } from './pages/application-data/application-data.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { SubtypeComponent } from './pages/subtype/subtype.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    EconomicSupportComponent,
    AdvanceComponent,
    ApplicationDataComponent,
    DocumentsComponent,
    PersonalDataComponent,
    SubtypeComponent,
    TicketsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApplicationDataComponent,
    PersonalDataComponent,
    TicketsComponent,
    AdvanceComponent,
    SubtypeComponent,
    DocumentsComponent
  ]
})
export class EconomicSupportModule { }

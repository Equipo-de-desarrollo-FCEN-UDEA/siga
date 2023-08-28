import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ApplicationDataComponent } from './pages/application-data/application-data.component';
import { EconomicSupportComponent } from './economic-support.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvanceComponent } from './pages/advance/advance.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubtypeComponent } from './pages/subtype/subtype.component';

@NgModule({
  declarations: [
    EconomicSupportComponent,
    ApplicationDataComponent,
    PersonalDataComponent,
    TicketsComponent,
    AdvanceComponent,
    DocumentsComponent,
    SubtypeComponent,
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

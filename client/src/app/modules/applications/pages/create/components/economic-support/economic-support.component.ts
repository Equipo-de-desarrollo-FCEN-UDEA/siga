import { Component, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

//ng-bootstrap
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

//interfaces
import {
  IAdvancePayment,
  IApplicationData,
  IEconomicSupportCreate,
  IDependence,
  IPersonalData,
  ITickets,
  IEconomicSupportResponse,
} from '@interfaces/applications/economic_support-interface';
import { file_path } from '@interfaces/documents';

//services
import { EconomicSupportService } from '@services/applications/economic-support.service';
import { DocumentService } from '@services/document.service';

// SweetAlert2
import Swal from 'sweetalert2';
import { ApplicationDataComponent } from './pages/application-data/application-data.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AdvanceComponent } from './pages/advance/advance.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { SubtypeComponent } from './pages/subtype/subtype.component';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-economic-support',
  templateUrl: './economic-support.component.html',
  styleUrls: ['./economic-support.component.scss'],
})
export class EconomicSupportComponent {
  // Acceder a los form
  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,

    private router: Router,

    public formatter: NgbDateParserFormatter,

    private economicSupportSvc: EconomicSupportService,
    private documentSvc: DocumentService,

    private applicationData: ApplicationDataComponent,
    private personalData: PersonalDataComponent,
    private tickets: TicketsComponent,
    private advance: AdvanceComponent,
    private documentsComponent: DocumentsComponent,
    private applicationSubtype: SubtypeComponent
  ) {}

  public form = this.fb.group({
    dependencies: [this.applicationSubtype.dependencies],
    application_data: [this.applicationData.form.value],
    personal_data: [this.personalData.form.value],
    tickets: [this.tickets.form.value],
    advance: [this.advance.form.value],
    documents: [this.documentsComponent.form.value],
  });

  // //Observar cambios en los componentes hijos
  @ViewChild(SubtypeComponent)
  application_sub_type_form!: SubtypeComponent;

  @ViewChild(ApplicationDataComponent)
  application_data_form!: ApplicationDataComponent;

  @ViewChild(PersonalDataComponent)
  personal_data_form!: PersonalDataComponent;

  @ViewChild(TicketsComponent)
  tickets_form!: TicketsComponent;

  @ViewChild(AdvanceComponent)
  advance_form!: AdvanceComponent;

  @ViewChild(DocumentsComponent)
  documents_form!: DocumentsComponent;

  submit() {
    const DEPENDENCIES =
      this.application_sub_type_form.sendForms() as IDependence[];
    const APPLICATION_DATA =
      this.application_data_form.sendForms() as IApplicationData;
    const PERSONAL_DATA = this.personal_data_form.sendForms() as IPersonalData;
    const TICKETS = this.tickets_form.sendForms() as ITickets;
    const PAYMENT = this.advance_form.sendForms() as IAdvancePayment;
    const DOCUMENTS = this.documents_form.sendForms() as file_path[];
    const APPLICATION_SUB_TYPE = 14;

    let economic_support: IEconomicSupportCreate = {
      application_sub_type_id: APPLICATION_SUB_TYPE,
      dependence: DEPENDENCIES,
      application_data: APPLICATION_DATA,
      personal_data: PERSONAL_DATA,
      tickets: TICKETS,
      payment: PAYMENT,
      documents: DOCUMENTS,
    };

    let economicSupportForm: Observable<IEconomicSupportResponse>;

    // Validar que se hayan llenado todos los campos
    const IS_INVALID_DOCUMENT = DOCUMENTS.length < 6;
    const IS_INVALID_DEPENDENCE = DEPENDENCIES.length === 0;

    if (IS_INVALID_DEPENDENCE) {
      Swal.fire({
        title: 'Error',
        text: '¡Debe seleccionar al menos una dependencia!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }

    if (IS_INVALID_DOCUMENT) {
      Swal.fire({
        title: 'Error',
        text: '¡Revise que haya llenado todos los campos y subidos todos los documentos que la solicitud sugiere!',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3AB795',
      });
      return;
    }

    economicSupportForm = this.documentSvc
      .postDocument(DOCUMENTS as unknown as File[])
      .pipe(
        switchMap((data: any) => {
          if (data) {
            console.log(data);
            this.form.patchValue({
              documents: data.files_paths,
            });
          }
          economic_support.documents = data.files_paths;
          console.log(economic_support);
          return this.economicSupportSvc.postEconomicSupport(economic_support);
        })
      );

    economicSupportForm.subscribe({
      next: (data) => {
        Swal.fire({
          title: '¡Solicitud enviada!',
          text: '¡La solicitud de apoyo económico se ha creado con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3AB795',
        });
        this.router.navigateByUrl(
          `/solicitudes/ver/${data.id}/apoyo-economico`
        );
      },
    });
  }

  validSize() {
    return true;
  }

  validFileType() {
    return true;
  }
}

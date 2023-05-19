import { Component, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

//ng-bootstrap
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

//interfaces
import {
  IAdvancePayment,
  IApplicationData,
  IEconomicSupportCreate,
  IPersonalData,
  ITickets,
} from '@interfaces/applications/economic_support-interface';
import { DocumentsResponse, file_path } from '@interfaces/documents';

//services
import { EconomicSupportService } from '@services/applications/economic-support.service';
import { DocumentService } from '@services/document.service';

// SweetAlert2
import Swal from 'sweetalert2';
import { ApplicationTypesService } from '@services/application-types.service';
import { ApplicationDataComponent } from './pages/application-data/application-data.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AdvanceComponent } from './pages/advance/advance.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { SubtypeComponent } from './pages/subtype/subtype.component';
import { VacationCreate } from '@interfaces/applications/vacation';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-economic-support',
  templateUrl: './economic-support.component.html',
  styleUrls: ['./economic-support.component.scss'],
})
export class EconomicSupportComponent {
  // For handle errors
  public clicked = 0;
  public error = '';

  @Output() submitted = false;

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
    application_sub_type_id: [this.applicationSubtype.subtype],
    application_data: [this.applicationData.form.value],
    personal_data: [this.personalData.form.value],
    tickets: [this.tickets.form.value],
    advance: [this.advance.form.value],
    documents: [this.documentsComponent.form.value],
  });

  //Observar cambios en los componentes hijos
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
    this.submitted = true;
    //ALMACENA LOS DATOS DE LOS COMPONENTES HIJOS EN CONSTANTES
    const APPLICATION_DATA: IApplicationData = Object(
      this.application_data_form.sendForms()
    );
    const PERSONAL_DATA: IPersonalData = Object(
      this.personal_data_form.sendForms()
    );
    const TICKETS: ITickets = Object(this.tickets_form.sendForms());
    const PAYMENT: IAdvancePayment = Object(this.advance_form.sendForms());
    const DOCUMENTS: file_path[] = Object(this.documents_form.sendForms());
    const APPLICATION_SUB_TYPE = Object(
      this.application_sub_type_form.sendForms()
    );

    for (let i = 0; i < APPLICATION_SUB_TYPE.length; i++) {
      let economic_support: IEconomicSupportCreate = {
        application_sub_type_id: APPLICATION_SUB_TYPE[i],
        application_data: APPLICATION_DATA,
        personal_data: PERSONAL_DATA,
        tickets: TICKETS,
        payment: PAYMENT,
        documents: DOCUMENTS,
      };
      // Se detiene aqui si el formulario es invalido
      if (this.form.invalid) {
        Swal.fire({
          title: 'Error',
          text: '¡Revise que haya llenado todos los campos que el Formato sugiere!',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3AB795',
        });
        return;
      }

      let economic_support_form = this.economicSupportSvc.postEconomicSupport(
        economic_support as unknown as IEconomicSupportCreate
      );

      //console.log(economic_support);
      if (DOCUMENTS.length > 0) {
        economic_support_form = this.documentSvc.postDocument(DOCUMENTS as unknown as File[]).pipe(
          switchMap((data: any) => {
            if (data) {
              //console.log(DOCUMENTS);
              console.log(data);
              this.form.patchValue({
                documents: data.files_paths,
              });
            }
            economic_support.documents = data.files_paths;
            console.log(economic_support);
            return economic_support_form = this.economicSupportSvc.postEconomicSupport(
              economic_support as IEconomicSupportCreate
            );
          })
        );
      }
 
      economic_support_form.subscribe({
        next: (data) => {
          Swal.fire({
            title: '¡Solicitud enviada!',
            text: '¡La solicitud de apoyo económico se ha creado con éxito!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          });
          this.router.navigateByUrl(
            `/solicitudes/lista`
          );
        },
        error: (err) => {
          this.error = err;
        },
      });
    }
  }

  validSize() {
    return true;
  }

  validFileType() {
    return true;
  }
}

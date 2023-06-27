import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

// SweetAlert2
import Swal from 'sweetalert2';

// interfaces
import { Application } from '@interfaces/application';
import {
  IEconomicSupportInDB,
  IEconomicSupportResponse,
} from '@interfaces/applications/economic_support-interface';
import {
  IUserApplication,
  IUserApplicationCreate,
} from '@interfaces/user_application_interface';
import { ApplicationStatus } from '@interfaces/application_status';
import { UserResponse } from '@interfaces/user';

// Utils
import { lastElement } from '@shared/utils';

// Services
import { DocumentService } from '@services/document.service';
import { EconomicSupportService } from '@services/applications/economic-support.service';
import { AuthService } from '@services/auth.service';
import { ComService } from '../../connection/com.service';
import { ApplicationStatusService } from '@services/application-status.service';
import { UserApplicationService } from '@services/user-application.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-economic-support',
  templateUrl: './economic-support.component.html',
  styleUrls: ['./economic-support.component.scss'],
})
export class EconomicSupportComponent implements OnInit {
  public application_id: number = 0;
  public user_id: number = 15;

  public current_status: string = '';
  public amount_approved: number = 0;

  public isSuperUser$ = this.authSvc.isSuperUser$;

  public today = new Date();
  public end_date = new Date();

  public UserApplication$ = new Observable<IUserApplication[]>();

  public economic_support: IEconomicSupportInDB | undefined = undefined;
  public userApplication: IUserApplication | undefined = undefined;

  public user: UserResponse | undefined = undefined;
  public application: Application | undefined = undefined;
  public application$ = new Observable<Application>();

  @Input() status: ApplicationStatus[] | undefined;

  constructor(
    //ROUTERS
    private router: Router,
    private route: ActivatedRoute,

    //FORMS
    private fb: FormBuilder,

    //SERVICES
    private applicationStatusSvc: ApplicationStatusService,
    private userApplicationSvc: UserApplicationService,
    private economicSupportSvc: EconomicSupportService,
    private documentSvc: DocumentService,
    private authSvc: AuthService,
    private comSvc: ComService
  ) {
    this.authSvc.isSuperUser();
    this.route.parent?.params.subscribe((params) => {
      this.application_id = params['id'];
    });
  }

  public form = this.fb.group({
    amount_approved: [0, [Validators.required]],
  });

  ngOnInit(): void {
    this.economicSupportSvc
      .getEconomicSupport(this.application_id)
      .subscribe((app: IEconomicSupportResponse) => {
        const { economic_support, ...application } = app;
        this.economic_support = economic_support;
        this.application = application;

        console.log(this.economic_support);

        this.amount_approved = lastElement(
          application.application_status
        ).amount_approved;
        this.current_status = lastElement(
          application.application_status
        ).status.name;
        this.comSvc.push(this.application);
        //this.end_date = new Date(economic_support.end_date)
      });

    this.applicationStatusSvc;
  }
  // -----------------------------------------
  // ------------- OPEN DOCUMENTS ----------
  // -----------------------------------------
  openDocument(path: string) {
    this.documentSvc.getDocument(path).subscribe({
      next: (res) => {
        window.open(window.URL.createObjectURL(res));
      },
      error: (err) => {
        // if (err.status === 404 || err.status === 401) {
        //   this.error = err.error.msg;
        // }
      },
    });
  }

  // -----------------------------------------
  // ------ DELETE ECONOMIC SUPPORT ----------
  // -----------------------------------------
  delete(id: number): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta solicitud?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.economicSupportSvc.deleteEconomicSupport(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminada!',
              text: '¡La solicitud ha sido eliminada!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home']);
              }
            });
          },
        });
      }
    });
  }

  submit() {
    const FORM = this.userApplicationSvc.putUserApplication(
      this.application_id,
      {
        application_id: Number(this.application_id),
        user_id: Number(this.user_id),
        amount: this.form.value.amount_approved!,
        response: 1,
      } as any)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Aceptada!',
            text: '¡La solicitud ha sido aprobada!',
            icon: 'success',
            confirmButtonColor: '#3AB795',
          });
        }
      });
  }

  decline() {
    const FORM = this.userApplicationSvc.putUserApplication(
      this.application_id,
      {
        application_id: Number(this.application_id),
        user_id: Number(this.user_id),
        amount: this.form.value.amount_approved!,
        response: 2,
      } as any)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Rechazada!',
            text: 'La solicitud se ha sido rechazada',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          });
        }
      });
  }
}

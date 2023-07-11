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
import { UserService } from '@services/user.service';
import { switchMap } from 'rxjs/operators';
import { UserPerIdPipe } from './pipes/user-per-id.pipe';
import { file_path } from '@interfaces/documents';

@Component({
  selector: 'app-economic-support',
  templateUrl: './economic-support.component.html',
  styleUrls: ['./economic-support.component.scss'],
})
export class EconomicSupportComponent implements OnInit {
  public application_id: number = 0;
  public user_id: number = 0;
  public userRol: string = '';

  public dependecies: any[] = [];

  public current_status: string = '';

  public amount_approved: number = 0;
  public total_amount: number = 0;

  public isSuperUser$ = this.authSvc.isSuperUser$;

  public economic_support: IEconomicSupportInDB | undefined = undefined;
  public userApplication: IUserApplication | undefined = undefined;
  public user: UserResponse | undefined = undefined;
  public application: Application | undefined = undefined;

  public application$ = new Observable<Application>();

  @Input() status: ApplicationStatus[] | undefined;

  public error: string = '';

  // Files
  public files: any[] = [];
  public document_new = [1];
  public documents: file_path[] = [];

  constructor(
    //ROUTERS
    private router: Router,
    private route: ActivatedRoute,

    //Pipes
    private userPerId: UserPerIdPipe,

    //FORMS
    private fb: FormBuilder,

    //SERVICES
    private applicationStatusSvc: ApplicationStatusService,
    private userApplicationSvc: UserApplicationService,
    private economicSupportSvc: EconomicSupportService,
    private documentSvc: DocumentService,
    private userService: UserService,
    private authSvc: AuthService,
    private comSvc: ComService
  ) {
    this.authSvc.isSuperUser();
    this.route.parent?.params.subscribe((params) => {
      this.application_id = params['id'];
    });

    const userSvc = this.route.params.pipe(
      switchMap((params) => {
        this.user_id = params['id'];
        return this.userService.getUser(params['id']);
      })
    );
    userSvc.subscribe((user) => {
      this.user_id = user.id;
      this.userRol = user.rol.name;
      if (this.userRol === 'Coordinador') {
        this.userApplicationSvc
          .getUserApplication(this.application_id)
          .subscribe((res) => {
            this.userApplication = res;
            //console.log(this.userApplication);
          });
      }
      if (this.userRol === 'Decano' || this.userRol === 'Director') {
        this.userApplicationSvc
          .getUserApplications(this.application_id)
          .subscribe((res) => {
            this.dependecies = res;
            console.log(this.dependecies);
            this.dependecies.forEach((dependence) => {
              dependence.transformedUserId = this.userPerId
                .transform(dependence.user_id)
                .then((res) => {
                  dependence.transformedUserId = res;
                  //console.log(dependence.transformedUserId);
                });
            });
          });
      }
    });

    this.userApplicationSvc.computeTotalAmount(this.application_id).subscribe({
      next: (res) => {
        this.total_amount = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public form = this.fb.group({
    amount_approved: [0, [Validators.required]],
    document: [this.documents],
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
        if (err.status === 404 || err.status === 401) {
          this.error = err.error.msg;
        }
      },
    });
  }

  generateZipFile() {
    this.economicSupportSvc.downloadZipFile(this.application_id);
  }

  // --------------------------------------
  // -------- ARCHIVOS - ANEXOS -----------
  // --------------------------------------

  onUpload(event: Event, index: number) {
    const ELEMENT = event.target as HTMLInputElement;
    const FILE = ELEMENT.files?.item(0);
    if (FILE) {
      this.files.splice(index, 1, FILE);
    }
  }

  validSize() {
    const FILTERED_FILES = this.files.filter((file) => file !== undefined);
    const SIZE = FILTERED_FILES.map((file) => file?.size || 0).reduce(
      (a, b) => a + b,
      0
    );
    return SIZE < 2 * 1024 * 1024;
  }

  validFileType() {
    const validExtensions = ['png', 'jpg', 'gif', 'jpeg', 'pdf'];
    let flag = true;
    this.files.forEach((file) => {
      const fileExtension = file?.name.split('.').pop()?.toLowerCase();
      if (!validExtensions.includes(fileExtension)) {
        flag = false;
      }
    });

    return flag;
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

  //FUNCTION TO ACCEPT A DEPENDENCY-APPLICATION NOT THE APPLICATION
  approved() {
    this.documentSvc
      .postDocument(this.files as File[])
      .pipe(
        switchMap((data) => {
          this.form.patchValue({
            document: data.files_paths,
          });

          let user_application_form = {
            application_id: Number(this.application_id),
            user_id: Number(this.user_id),
            amount: this.form.value.amount_approved!,
            response: 1,
            document: this.form.value.document!,
          } as IUserApplicationCreate;

          return this.userApplicationSvc.putUserApplication(
            this.application_id,
            user_application_form
          );
        })
      )
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Aceptada!',
            text: '¡La solicitud ha sido aprobada por su dependencia!',
            icon: 'success',
            confirmButtonColor: '#3AB795',
          });
        },
      });
  }

  //FUNCTION TO DECLINE A DEPENDENCY-APPLICATION NOT THE APPLICATION
  decline() {
    const FORM = this.userApplicationSvc
      .putUserApplication(this.application_id, {
        application_id: Number(this.application_id),
        user_id: Number(this.user_id),
        amount: this.form.value.amount_approved!,
        response: 2,
        document: (this.form.value.document! = []),
      } as IUserApplication)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Rechazada!',
            text: 'La solicitud ha sido rechazada por su dependencia!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3AB795',
          });
        },
      });
  }
}

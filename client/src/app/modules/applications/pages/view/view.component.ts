import { Location } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Application } from '@interfaces/application';
import { ApplicationStatusCreate } from '@interfaces/application_status';
import { ApplicationStatusService } from '@services/application-status.service';
import { ApplicationService } from '@services/application.service';
import { AuthService } from '@services/auth.service';
import { Observable, Subject, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ComService } from './connection/com.service';
import { UserService } from '@services/user.service';
import { UserBase, UserResponse } from '@interfaces/user';
import { file_path } from '@interfaces/documents';
import { DocumentService } from '@services/document.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements AfterViewChecked {
  public title: string = '';

  public application$ = new Observable<Application>();
  public user$ = new Observable<UserResponse>();

  public text$ = new Observable<string>();

  public historyStatus = false;

  public isCoordinador$ = this.authSvc.isCoordinador$;
  public isSuperUser$ = this.authSvc.isSuperUser$;
  public isApproved$ = this.applicationStatusSvc.isApproved$;

  private activatedComponentReference: any;

  public id = 0;
  public isDelete: boolean = false;
  public submitted: boolean = false;
  public isDecline: boolean = false;

  // Files
  public files: any[] = [];
  public document_new = [1];
  public documents: file_path[] = [];

  constructor(
    private route: ActivatedRoute,
    private comSvc: ComService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private location: Location,

    private authSvc: AuthService,
    private userSvc: UserService,
    private documentSvc: DocumentService,
    private applicationStatusSvc: ApplicationStatusService
  ) {
    this.title = this.route.snapshot.firstChild?.data['title'];
    this.application$ = this.comSvc.application;
    this.authSvc.isSuperUser();
    this.authSvc.isCoordinador();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.applicationStatusSvc.isApproved(this.id);
  }

  public form = this.fb.group({
    observation: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(300)]],
    amount_approved: [0],
    document: [this.documents],
  });

  cancel() {
    this.location.back();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  isApproved(id: number) {
    this.applicationStatusSvc.isApproved(id);
  }

  // -----------------------------
  // ---- APROVED APPLICATION -----
  // -----------------------------
  submit() {
    this.submitted = true;
    const childRouteComp = this.activatedComponentReference;

    if (this.files.length > 0) {
      this.documentSvc.postDocument(this.files as File[]).pipe(
        switchMap((data) => {
          this.form.patchValue({
            document: data.files_paths,
          });

          return this.applicationStatusSvc.postApplicationStatus({
            application_id: this.id,
            observation: this.form.value.observation!,
            amount_approved: this.form.value.amount_approved!,
            document: this.form.value.document!,
            status_id: 1,
          } as ApplicationStatusCreate);
        })
      )
      .subscribe(() => {
        try {
          childRouteComp.submit().subscribe();
        } catch {}

        Swal.fire({
          title: 'Se cambió el estado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.location.back();
          }
        });
      });
    } else {
      // Handle the case when there are no files to upload
      this.applicationStatusSvc.postApplicationStatus({
        application_id: this.id,
        observation: this.form.value.observation!,
        amount_approved: this.form.value.amount_approved!,
        document: this.form.value.document!,
        status_id: 1,
      } as ApplicationStatusCreate)
      .subscribe(() => {
        try {
          childRouteComp.submit().subscribe();
        } catch {}

        Swal.fire({
          title: 'Se cambió el estado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.location.back();
          }
        });
      });
    }
  }



  // -----------------------------
  // ---- DECLINE APPLICATION -----
  // -----------------------------
  decline() {
    this.isDecline = true;
    this.applicationStatusSvc
      .postApplicationStatus({
        application_id: this.id,
        observation: this.form.value.observation!,
        status_id: 4,
      } as ApplicationStatusCreate)
      .subscribe((data) => {
        Swal.fire({
          title: 'La solicitud se devolvió correctamente',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.location.back();
          }
        });
      });
  }

  onActivate(componentRef: any) {
    this.activatedComponentReference = componentRef;
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
    return SIZE < 6 * 1024 * 1024;
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
  // -----------------------------
  // ---- DELETE APPLICATION -----
  // -----------------------------

  delete() {
    this.isDelete = true;
    const childRouteComp = this.activatedComponentReference;
    childRouteComp.delete(this.id);
  }
}

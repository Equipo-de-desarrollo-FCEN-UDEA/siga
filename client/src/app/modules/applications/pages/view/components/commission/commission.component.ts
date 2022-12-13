import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// interfaces
import { Application } from '@interfaces/application';
import { CommissionInDB, CommissionResponse } from '@interfaces/applications/commission';

// Services
import { CommissionService } from '@services/applications/commission.service';
import { AuthService } from '@services/auth.service';
import { DocumentService } from '@services/document.service';
import { lastElement } from '@shared/utils';
import { ComService } from '../../connection/com.service';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent implements OnInit {

  public id: number = 0;
  public error:string = '';

  public commission: CommissionInDB | undefined = undefined;

  public application: Application | undefined = undefined;

  public current_status: string = '';

  public today = new Date();

  public end_date = new Date();

  public isSuperUser$ = this.authSvc.isSuperUser$;

  public isLoading$ = this.loaderSvc.isLoading;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private commissionSvc: CommissionService,
    private comSvc: ComService,
    private documentService: DocumentService,
    private authSvc: AuthService,
    private loaderSvc: LoaderService
  ) {
    this.authSvc.isSuperUser()
    this.route.parent?.params.subscribe(
      params => {
        this.id = params['id']
      }
    )
   }

  ngOnInit(): void {
    
    this.commissionSvc.getCommission(this.id).subscribe(
      (app: CommissionResponse) => {
        const {commission, ...application} = app;
        this.commission = commission;
        this.application = application;

        this.current_status = lastElement(application.application_status).status.name;
        this.comSvc.push(this.application);
        this.end_date = new Date(commission.end_date)
      }
    )
  }

  openDocument(path:string) {
    this.documentService.getDocument(path).subscribe(
      res => window.open(window.URL.createObjectURL(res))
    )
  }

  // -----------------------------------------
  // ----------- DELETE COMMISSION ------------
  // -----------------------------------------
  delete(id: number): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta comisión?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commissionSvc.deleteCommission(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminada!',
              text: '¡La comisión ha sido eliminada!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home']);
              }
            });
          },
          error: (err) => {
            if (err.status === 404 || err.status === 401) {
              this.error = err
            }
          },
        });
      }
    });
  }

}

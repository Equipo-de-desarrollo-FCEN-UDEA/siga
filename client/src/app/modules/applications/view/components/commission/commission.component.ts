import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// interfaces
import { Application } from '@interfaces/application';
import { CommissionInDB, CommissionResponse } from '@interfaces/applications/commission';

// Services
import { CommissionService } from '@services/applications/commission.service';
import { DocumentService } from '@services/document.service';
import { ComService } from '../../connection/com.service';

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

  constructor(
    private comSvc: ComService,
    private router: Router,
    private route: ActivatedRoute,

    private commissionSvc: CommissionService,
    private documentService: DocumentService
  ) {
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
        this.commission = commission
        this.application = application
        this.comSvc.push(this.application)
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
                this.router.navigate(['/home/home']);
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

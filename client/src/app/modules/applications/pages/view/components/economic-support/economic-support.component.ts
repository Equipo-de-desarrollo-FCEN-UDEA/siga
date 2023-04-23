import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// SweetAlert2
import Swal from 'sweetalert2';

// interfaces
import { Application } from '@interfaces/application';
import { IEconomicSupportInDB, IEconomicSupportResponse } from '@interfaces/applications/economic_support-interface';

// Utils
import { lastElement } from '@shared/utils';

// Services
import { DocumentService } from '@services/document.service';
import { EconomicSupportService } from '@services/applications/economic-support.service';
import { AuthService } from '@services/auth.service';
import { ComService } from '../../connection/com.service';

@Component({
  selector: 'app-economic-support',
  templateUrl: './economic-support.component.html',
  styleUrls: ['./economic-support.component.scss']
})
export class EconomicSupportComponent implements OnInit {

  public id: number = 0;

  public current_status: string = '';

  public today = new Date();
  public end_date = new Date();


  public economic_support: IEconomicSupportInDB | undefined = undefined;
  public application: Application | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    
    private documentService: DocumentService,
    private economicSupportSvc: EconomicSupportService,
    private authSvc: AuthService,
    private comSvc: ComService,
  ) { 
    this.authSvc.isSuperUser();
    this.route.parent?.params.subscribe(
      params => {
        this.id = params['id']
      }
    )
  }

  ngOnInit(): void {
    this.economicSupportSvc.getEconomicSupport(this.id).subscribe(
      (app: IEconomicSupportResponse) => {
        const {economic_support, ...application} = app;
        this.economic_support = economic_support;
        this.application = application;
        
        console.log(this.economic_support);

        this.current_status = lastElement(application.application_status).status.name;
        this.comSvc.push(this.application);
        this.end_date = new Date(economic_support.end_date)
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

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

//interfaces
import { Application } from '@interfaces/application';
import {
  VacationInDB,
  VacationResponse,
} from '@interfaces/applications/vacation';

//services
import { VacationService } from '@services/applications/vacation.service';
import { DocumentService } from '@services/document.service';
import { lastElement } from '@shared/utils';
import { ComService } from '../../connection/com.service';
import { EMPTY, Observable } from 'rxjs';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.scss'],
})
export class VacationComponent implements OnInit {
  public id: number = 0;
  public error: string = '';

  public vacation: VacationInDB | undefined = undefined;
  public application: Application | undefined = undefined;
  public current_status: string | undefined = undefined;

  constructor(
    private comSvc: ComService,
    private route: ActivatedRoute,
    private router: Router,

    private vacationSvc: VacationService,
    private documentSvc: DocumentService
  ) {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.vacationSvc.getVacation(this.id).subscribe((app: VacationResponse) => {
      const { vacation, ...application } = app;
      this.vacation = vacation;
      this.application = application;
      let status_app = this.application.application_status[this.application.application_status.length-1].status.name;
      this.vacation.documents = this.vacation.documents!;
      if (status_app != 'SOLICITADA'){
        this.vacation.documents.pop();
      }
      this.current_status = lastElement(
        application.application_status
      ).status.name;
      this.comSvc.push(this.application);
    });
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

      },
    });
  }

   // -----------------------------------------
  // ----------- DELETE PERMISSION ------------
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
        this.vacationSvc.deleteVacation(id).subscribe({
          next: () => {
             Swal.fire({
              title: 'Eliminada!',
              text: '¡La solicitud ha sido eliminado!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home/home']);
              }
            });
          },
          error: (err) => {

          },
        });
      }
    });
  }
}

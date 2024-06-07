import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

// utils
import { lastElement } from '@shared/utils';

// interfaces
import { Application } from '@interfaces/application';
import {
  FullTimeInDB,
  FulltimeResponse,
} from '@interfaces/applications/full_time/full-time';

// services
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { AuthService } from '@services/auth.service';
import { DocumentService } from '@services/document.service';
import { ComService } from '../../connection/com.service';

@Component({
  selector: 'app-full-time',
  templateUrl: './full-time.component.html',
  styleUrls: ['./full-time.component.scss'],
})
export class FullTimeComponent implements OnInit {
  public full_time: FullTimeInDB | undefined = undefined;

  public application: Application | undefined = undefined;

  public current_status: string = '';

  public isSuperUser$ = this.authSvc.isSuperUser$;

  public fullTime$!: Observable<FulltimeResponse>;
  private id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private documentSvc: DocumentService,
    private fullTimeSvc: FullTimeService,
    private authSvc: AuthService,
    private comSvc: ComService
  ) {
    this.authSvc.isSuperUser();
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  // Function to determine if application is of type 'DEDICACION EXCLUSIVA' and status is 'EN VICERRECTORIA'
  isExclusiveDedication(application: Application): boolean {
    const lastStatus =
      application.application_status[application.application_status.length - 1];
    return (
      application.application_sub_type.application_type.name ===
        'DEDICACIÓN EXCLUSIVA' && lastStatus.status.name === 'EN VICERRECTORÍA'
    );
  }

  ngOnInit(): void {
    this.fullTimeSvc.getFullTime(this.id).subscribe((app: FulltimeResponse) => {
      const { full_time, ...application } = app;
      this.full_time = full_time;
      this.application = application;

      this.current_status = lastElement(
        application.application_status
      ).status.name;
      this.comSvc.push(this.application);
    });
  }

  openDocument(path: string) {
    this.documentSvc
      .getDocument(path)
      .subscribe((res) => window.open(window.URL.createObjectURL(res)));
  }

  // -----------------------------------------
  // ----------- DELETE COMMISSION ------------
  // -----------------------------------------
  delete(id: number): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta dedicación?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fullTimeSvc.deleteFullTime(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminada!',
              text: '¡La dedicación exclusiva ha sido eliminada!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home']);
              }
            });
          },
          error: (err) => {},
        });
      }
    });
  }

  copy(id: number): void {
    Swal.fire({
      title: '¿Seguro que quieres copiar esta dedicación?',
      text: 'Este es un proceso irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Copiar!',
    }).then((result) => {
      if (this.application?.application_status.length == 5){
        if (result.isConfirmed) {
        if (this.full_time ) { // Verifica si this.full_time está definido
          // Llama a la función postCopyFullTime del servicio FullTimeService
          this.fullTimeSvc.postCopyFullTime(id, this.full_time).subscribe({
            next: () => {
              Swal.fire({
                title: 'Copiada!',
                text: '¡La dedicación exclusiva ha sido copiada correctamente!',
                icon: 'success',
                confirmButtonColor: '#3AB795',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/home']);
                }
              });
            },
            error: (err) => {
              console.error('Error al copiar la dedicación:', err);
            },
          });
        } else {
          console.error('Error: this.full_time está undefined');
        }
      }
      }else {
        Swal.fire({
        title: '¡Atención!',
        text: 'Solo se pueden copiar aplicaciones aprobadas',
        icon: 'warning',
        confirmButtonColor: '#3AB795',
      });
      }
      
    });
  }
}  

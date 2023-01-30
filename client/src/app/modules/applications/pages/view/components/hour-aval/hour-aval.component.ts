import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@interfaces/application';
import { Act, HourAvalInDB, HourAvalResponse } from '@interfaces/applications/hour_aval';
import { Msg } from '@interfaces/msg';
import { HourAvalService } from '@services/applications/hour-aval.service';
import { AuthService } from '@services/auth.service';
import { DocumentService } from '@services/document.service';
import { lastElement } from '@shared/utils';
import { mergeScan, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ComService } from '../../connection/com.service';

@Component({
  selector: 'app-hour-aval',
  templateUrl: './hour-aval.component.html',
  styleUrls: ['./hour-aval.component.scss']
})
export class HourAvalComponent {
  public hour_aval!: HourAvalInDB;
  public application!: Application;

  public current_status: string = '';
  public id: number = 0;

  public isSuperUser$ = this.authSvc.isSuperUser$;

  public form: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private documentSvc: DocumentService,
    private hourAvalSvc: HourAvalService,
    private authSvc: AuthService,
    private comSvc: ComService,
    private formBuilder: FormBuilder
  ) {

    this.authSvc.isSuperUser()
    this.route.parent?.params.subscribe(
      params => {
        this.id = params['id']
      }
    )
    this.form = formBuilder.group({
      act: [''],
      date: [new Date()]
    })
  }

  ngOnInit(): void {
    this.hourAvalSvc.getHourAval(this.id)
      .subscribe((app: HourAvalResponse) => {
        const { hour_aval, ...application } = app;
        this.hour_aval = hour_aval;
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
        this.hourAvalSvc.deleteHourAval(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminada!',
              text: '¡La dedicación de aval de horas ha sido eliminada!',
              icon: 'success',
              confirmButtonColor: '#3AB795',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home']);
              }
            });
          },
          error: (err) => {
          },
        });
      }
    });
  }

  // Funciones de la solicitud
  generateLetter() {
    Swal.fire({
      title: '¿Seguro que quieres generar la carta?',
      text: 'No podrás editarla y los usuarios que no hayan aceptado no aparecerán en la carta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3AB795',
      confirmButtonText: 'Enviar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hourAvalSvc.generateLetter(this.id).subscribe({
          next: (response) => {
            this.ngOnInit();
            Swal.fire({
              title: 'Creada!',
              text: response.msg,
              icon: 'success',
              confirmButtonColor: '#3AB795',
            });
          },
          error: (err) => {

          },
        });
      }
    });
  }

  submit(): Observable<Msg> {
    return this.hourAvalSvc.generateAct(this.id, this.form.value as Act)
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HourAvalService } from '@services/applications/hour-aval.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aval-horas',
  template: '',
  styles: []
})
export class HoursAvalComponent {
  private id = '';
  private token = '';
  private acepted: number = 2;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hoursAvalSvc: HourAvalService
  ) {
    this.route.parent?.params.subscribe(params => this.id = params['id'])
    this.route.params.subscribe(params => this.token = params['token'])
    this.route.params.subscribe(params => this.acepted = params['acepted'])
    console.log(this.id, this.token, this.acepted)
    this.hoursAvalSvc.confirmHourAval(this.id, this.token, this.acepted).subscribe({
      next: res => {
        Swal.fire({
          title: 'Confirmación aval de horas',
          text: res.msg,
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(
          response => {
            if (response.isConfirmed) {
              this.router.navigate(['auth/login'])
            }
          }
        )
      },
      error: res => {
        this.router.navigate(['auth/login'])
      }
    })
  }
}

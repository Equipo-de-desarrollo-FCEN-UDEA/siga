import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FullTimeCreate,
  FulltimeResponse,
} from '@interfaces/applications/full_time/full-time';
import { file_path } from '@interfaces/documents';
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { DocumentService } from '@services/document.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full-time',
  templateUrl: './full-time.component.html',
  styleUrls: ['./full-time.component.scss'],
})
export class FullTimeComponent implements OnInit {
  private id: number = 0;
  public submitted: boolean = false;
  public application: FulltimeResponse | null = null;


  // Files
  public documents: file_path[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private fullTimeSvc: FullTimeService,
    private documentSvc: DocumentService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];

      this.fullTimeSvc.getFullTime(this.id).subscribe((data) => {
        this.application = data;
        console.log(data)
      });
    });
  }

  isInvalidForm() {
    if (
      this.application?.full_time.initial_letter &&
      this.application?.full_time.vice_format &&
      this.application?.full_time.work_plan
    ) {
      return false;
    } else {
      return true;
    }
  }


  // --------------------------------------
  // ------------ SUBMIT FORM  ------------
  // --------------------------------------
  submit() {
    this.submitted = true;

    if(this.isInvalidForm()){
      return
    }

    let fullTime = this.fullTimeSvc.putFullTime(this.id);
    fullTime.subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Actualizado',
          text: '¡La dedicación se solicitó con éxito con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3AB795',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate([
              'solicitudes/ver/' + this.id + '/dedicacion',
            ]);
          }
        });
      },
    });
  }
}

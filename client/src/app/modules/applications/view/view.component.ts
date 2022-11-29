import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Application } from '@interfaces/application';
import { ApplicationStatusCreate } from '@interfaces/application_status';
import { ApplicationStatusService } from '@services/application-status.service';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import { Observable, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ComService } from './connection/com.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, AfterViewChecked {

  public title:string = '';

  public application$ = new Observable<Application>();

  public text$ = new Observable<string>();

  public historyStatus = false;

  public isSuperUser = this.authSvc.isSuperUser$;

  public isLoading = this.loaderSvc.isLoading;

  public id = 0;

  constructor(
    private route: ActivatedRoute,
    private comSvc: ComService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,

    private authSvc: AuthService,
    private loaderSvc: LoaderService,
    private applicationStatusSvc: ApplicationStatusService
  ) { 
    this.title = this.route.snapshot.firstChild?.data['title'];
    this.application$ = this.comSvc.application;
    this.authSvc.isSuperUser();
    this.route.params.subscribe(
      params => {
        this.id = params['id']
      }
    )
  }

  public form = this.fb.group({
    observation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]]
  })

  ngOnInit(): void {
    
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges()
  }

  submit() {
    this.applicationStatusSvc.postApplicationStatus({
      "application_id": this.id,
      "observation": this.form.value.observation!,
      "status_id": 1
    } as ApplicationStatusCreate).subscribe(
      (data) => {
        Swal.fire({
          title: "Se cambió el estado correctamente"
        })
      }
    )

  }


  decline() {
    this.applicationStatusSvc.postApplicationStatus({
      "application_id": this.id,
      "observation": this.form.value.observation!,
      "status_id": 4
    } as ApplicationStatusCreate).subscribe(
      (data) => {
        Swal.fire({
          title: "La solicitud se rechazó correctamente",
          confirmButtonText: "Aceptar"
        })
      }
    )
  }


  delete(){
    
  }

}

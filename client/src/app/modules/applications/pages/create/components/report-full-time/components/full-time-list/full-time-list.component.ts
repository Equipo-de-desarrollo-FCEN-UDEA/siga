import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Application } from '@interfaces/application';
import { FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { ApplicationService } from '@services/application.service';
import { FullTimeService } from '@services/applications/full_time/full-time.service';

@Component({
  selector: 'app-full-time-list',
  templateUrl: './full-time-list.component.html',
  styleUrls: ['./full-time-list.component.scss']
})
export class FullTimeListComponent implements OnInit {
  public historyFullTime = false;
  public applications: Application [] = [];
  public full_time: FulltimeResponse [] = [];

  public from_full_time: boolean = true;

 

  constructor(
    private applicationSvc: ApplicationService,
    private fullTimeSvc: FullTimeService,
    private fb: FormBuilder,
  ) { }

  public form = this.fb.group({
    from_full_time: [true],
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
   })


  loadApplications() {
    this.applicationSvc.getApplications().subscribe(
      (applications) => {
        this.applications = applications.filter(application =>
          application.application_sub_type_id === 10
          && application.application_status[0].status.id === 3);
  
        this.full_time = []; 
        for (let application of this.applications) {
          this.fullTimeSvc.getFullTime(application.id).subscribe(
            (full_time) => {
              this.full_time.push(full_time);
              if (this.full_time.length > 0) {
                console.log(this.full_time[0].full_time.title);
              }
            });
        }
      });
  }

   // --------------------------------------------------
  // ----------- MANEJO DE ERRORES EN EL FORM ---------
  // --------------------------------------------------

  // Acceder a los form
  get f() {
    return this.form.controls;
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }

  

  ngOnInit(): void {
    this.loadApplications();
  }

}

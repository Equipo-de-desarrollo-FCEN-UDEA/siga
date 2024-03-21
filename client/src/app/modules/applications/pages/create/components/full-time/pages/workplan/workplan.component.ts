import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//sweetalert2
import Swal from 'sweetalert2';

//interfaces
import { FulltimeResponse } from '@interfaces/applications/full_time/full-time';

//services
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { LoaderService } from '@services/loader.service';
import { FormsStatusService } from "@services/applications/full_time/interaction-components/forms-status.service";


@Component({
  selector: 'app-workplan',
  templateUrl: './workplan.component.html',
  styleUrls: ['./workplan.component.scss']
})
export class WorkplanComponent implements OnInit {

  public f_workplan = this.fb.group({
    period: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(6)]],
    registro: ['', [Validators.required]],
    partial_time: [NaN, [Validators.required]],
    teaching_activities: this.fb.array([]),
    investigation_activities: this.fb.array([]),
    extension_activities: this.fb.array([]),
    academic_admin_activities: this.fb.array([]),
    other_activities:  this.fb.array([]),
    observations: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    working_week: this.fb.array([this.workDayGroup()], [Validators.required]),
  });

  //id de la dedicacion
  private id: number = 0;

  public application: FulltimeResponse | null = null;
  public work_plan:any;
  public error: any = '';

  @Input() editable: any;



  // ------------------------------
  // --------- GETTERS ------------
  // ------------------------------

  get teachingActivitiesArr(): FormArray { return this.f_workplan.get('teaching_activities') as FormArray; }

  get investigationActivitiesArr(): FormArray { return this.f_workplan.get('investigation_activities') as FormArray; }

  get extensionActivitiesArr(): FormArray { return this.f_workplan.get('extension_activities') as FormArray; }

  get academicAdministrationArr(): FormArray { return this.f_workplan.get('academic_admin_activities') as FormArray; }

  get otherActivitiesArr(): FormArray { return this.f_workplan.get('other_activities') as FormArray;}

  get workDayArr(): FormArray { return this.f_workplan.get('working_week') as FormArray; }

  //Accede al form
  get f() { return this.f_workplan.controls }

  constructor(
    private fb: FormBuilder,
    private fullTimeSvc: FullTimeService,
    private loaderSvc: LoaderService,
    private router: Router,
    private route: ActivatedRoute,

    public formsStatusService: FormsStatusService,
  ) {

    //busca el id de la dedicacion
    this.route.params.subscribe(
      params => {
        this.id = params['id']
        this.fullTimeSvc.getFullTime(this.id).subscribe(data =>{
          if(data.full_time.work_plan) {
            this.f_workplan.patchValue({
              period: data.full_time.work_plan.period,
              registro: data.full_time.work_plan.registro,
              partial_time: data.full_time.work_plan.partial_time,
              observations: data.full_time.work_plan.observations
            });

            this.patchTeachingActivities(data.full_time.work_plan.teaching_activities);
            this.patchInvestigationActivities(data.full_time.work_plan?.investigation_activities);
            this.patchExtensionActivities(data.full_time.work_plan?.extension_activities);
            this.patchAcademicAdministration(data.full_time.work_plan?.academic_admin_activities);
            this.patchOtherActivities(data.full_time.work_plan?.other_activities);
            // this.patchWorkDay(data.full_time.work_plan?.working_week);
          }
        });
      }
    )
  }

  ngOnInit(): void {

  }



  // ------------------------------
  // --------- ENVIAR -------------
  // ------------------------------

  submit() {
    Swal.fire({
      title: 'Error',
      text: '¡Revise que haya llenado todos los campos que el Formato sugiere!',
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3AB795',
    });
    //guarda el plan de trabajo en una variable
    let work_plan: any = {
      ... this.f_workplan.value as any,
    }


    work_plan.working_week = work_plan.working_week[0]

    this.loaderSvc.show();

    //llamado del servicio y envio del plan de trabajo
    this.fullTimeSvc.putWorkPlan(work_plan, this.id).subscribe(
      (res:any) => {
        if (res) {
          Swal.fire(
            {
              title: 'El Plan de trabajo se ha guardado con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }
          ).then((result) => {
            if (result.isConfirmed) {
              this.formsStatusService.setWorkPlanStatus(true);
              this.router.navigate([`/solicitudes/editar/${this.id}/dedicacion`]);
            }
          });
        }
      }
    );
  }



  // --------------------------------
  // ---- ACTIVIDADES DE DOCENCIA ---
  // --------------------------------

  // --------- GROUPS -----------

  teachingActivitiesGroup() {
    return this.fb.group({
      activity_identification: this.fb.group({
        code: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        group: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(1)]],
        name: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      }),
      student_quantity: [NaN, [Validators.required]],
      level: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      week_hours: this.fb.group({
        t: [[Validators.required]],
        tp: [[Validators.required]],
        p: [[Validators.required]],
      }),
      total_hours: [NaN, [Validators.required]],
      activity_tracking: this.fb.group({
        date_1: [new Date(), [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        date_2: [new Date(), [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        other: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      })
    });
  }

  // --------- ADD CARDS -----------

  addTeachingActivities() { this.teachingActivitiesArr.push(this.teachingActivitiesGroup()); }

  // --------- PATCHS -----------

  patchTeachingActivities(activity: any) {
    for (let i = 0; i < activity.length; i++) {
      this.addTeachingActivities();
    }
    this.teachingActivitiesArr.patchValue(activity);
  }



  // --------------------------------
  // - ACTIVIDADES DE INVESTIGACION -
  // --------------------------------

  // --------- GROUPS -----------

  investigationActivitiesGroup() {
    return this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      project_identification: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      responsibilities: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      cost: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      supporting_document: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      period_hours: [NaN, [Validators.required]],
      activity_tracking: this.fb.group({
        date_1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        date_2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        other: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      })
    });
  }

  // --------- ADD CARDS -----------

  addInvestigationActivities() { this.investigationActivitiesArr.push(this.investigationActivitiesGroup()); }

  // --------- PATCHS -----------

  patchInvestigationActivities(activity: any) {
    for (let i = 0; i < activity.length; i++) {
      this.addInvestigationActivities();
    }
    this.investigationActivitiesArr.patchValue(activity);
  }



  // --------------------------------
  // --- ACTIVIDADES DE EXTENSION ---
  // --------------------------------

  // --------- GROUPS -----------

  extensionActivitiesGroup() {
    return this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      activity_identification: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      responsibility: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      cost:  ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      week_hours: [NaN, [Validators.required]],
      period_hours: [NaN, [Validators.required]],
      activity_tracking: this.fb.group({
        date_1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        date_2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        other: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      })
    });
  }

  // --------- ADD CARDS -----------

  addExtensionActivities() { this.extensionActivitiesArr.push(this.extensionActivitiesGroup()); }

  // --------- PATCHS -----------

  patchExtensionActivities(activity: any) {
    for (let i = 0; i < activity.length ; i++) {
      this.addExtensionActivities();
    }
    this.extensionActivitiesArr.patchValue(activity);
  }



  // --------------------------------
  // --- ADMINISTACION ACADEMICA ----
  // --------------------------------


  // --------- GROUPS -----------

  academicAdministrationGroup() {
    return this.fb.group({
      position: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      week_hours: [NaN, [Validators.required]],
      activities: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      period_hours: [NaN, [Validators.required]],
      activity_tracking:this.fb.group({
        date_1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        date_2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        other: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      })
    });
  }

  // --------- ADD CARDS -----------

  addAcademicAdministration() { this.academicAdministrationArr.push(this.academicAdministrationGroup()); }

  // --------- PATCHS -----------

  patchAcademicAdministration(activity: any) {
    for (let i = 0; i < activity.length ; i++) {
      this.addAcademicAdministration();
    }
    this.academicAdministrationArr.patchValue(activity);
  }




  // --------------------------------
  // ----- OTRAS ACTIVIDADES  -------
  // --------------------------------

  // --------- GROUPS -----------

  otherActivitiesGroup() {
    return this.fb.group({
      activity:  ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      period_hours: [NaN, [Validators.required]],
      activity_tracking: this.fb.group({
        date_1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        date_2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
        other: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      })
    });
  }

  // --------- ADD CARDS -----------

  addOtherActivities() { this.otherActivitiesArr.push(this.otherActivitiesGroup()); }

  // --------- PATCHS -----------

  patchOtherActivities(activity: any) {
    for (let i = 0; i < activity.length ; i++) {
      this.addOtherActivities();
    }
    this.otherActivitiesArr.patchValue(activity);
  }


  // --------------------------------
  // ----- JORNADA DE TRABAJO  ------
  // --------------------------------

  // --------- GROUPS -----------

  workDayGroup() {
    return this.fb.group({

      monday: this.fb.group({
        morning_start: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        morning_end: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_start: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_end: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      }),

      tuesday: this.fb.group({
        morning_start: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        morning_end: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_start: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_end: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      }),

      wednesday: this.fb.group({
        morning_start: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        morning_end: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_start: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_end: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      }),


      thursday: this.fb.group({
        morning_start: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        morning_end: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_start: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_end: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      }),

      friday: this.fb.group({
        morning_start: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        morning_end: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_start: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_end: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      }),

      saturday: this.fb.group({
        morning_start: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        morning_end: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_start: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
        afternoon_end: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      }),

    });

  }

  // --------- PATCHS -----------

  patchWorkDay(activity: any) { this.workDayArr.patchValue(activity); }


  // ------------------------------
  // -------- REMOVE CARDS --------
  // ------------------------------

  removeInput(controlName: string, index: number) {
    const control = this.f_workplan.get(controlName) as FormArray;
    control.removeAt(index);
  }


  validSize() { return true; }

  validFileType() { return true; }
}

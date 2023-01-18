import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';

//sweetalert2
import Swal from 'sweetalert2';

//interfaces
import { FullTimeInDB, FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { WorkPlan } from '@interfaces/applications/full_time/work-plan';

//services
import { FullTimeService } from '@services/applications/full_time/full-time.service';
import { LoaderService } from '@services/loader.service';


@Component({
  selector: 'app-workplan',
  templateUrl: './workplan.component.html',
  styleUrls: ['./workplan.component.scss']
})
export class WorkplanComponent implements OnInit {

  public f_workplan = this.fb.group({
    semester: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(6)]],
    register: ['', [Validators.required]],
    part_time: [NaN, [Validators.required]],
    general_remarks: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    teaching_activities: this.fb.array([this.teachingActivitiesGroup()], [Validators.required]),
    investigation_activities: this.fb.array([this.investigationActivitiesGroup()], [Validators.required]),
    extension_activities: this.fb.array([this.extensionActivitiesGroup()], [Validators.required]),
    academic_admin_activities: this.fb.array([this.academicAdministrationGroup()], [Validators.required]),
    other_activities:  this.fb.array([this.otherActivitiesGroup()], [Validators.required]),
    monitoring_activities: this.fb.array([this.monitoringActivitiesGroup()], [Validators.required]),
    work_day: this.fb.array([this.workDayGroup()], [Validators.required]),
  });

  public semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  @Input() id_full_time:number = 0;

  public work_plan:any;

  @Input() editable: any;

  // ------------------------------
  // --------- GETTERS ------------
  // ------------------------------

  get teachingActivitiesArr(): FormArray {
    return this.f_workplan.get('teaching_activities') as FormArray;
  }

  get investigationActivitiesArr(): FormArray {
    return this.f_workplan.get('investigation_activities') as FormArray;
  }

  get extensionActivitiesArr(): FormArray {
    return this.f_workplan.get('extension_activities') as FormArray;
  }

  get academicAdministrationArr(): FormArray {
    return this.f_workplan.get('academic_admin_activities') as FormArray;
  }

  get otherActivitiesArr(): FormArray {
    return this.f_workplan.get('other_activities') as FormArray;
  }

  get monitoringActivitiesArr(): FormArray {
    return this.f_workplan.get('monitoring_activities') as FormArray;
  }

  get workDayArr(): FormArray {
    return this.f_workplan.get('work_day') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private fullTimeSvc: FullTimeService,
    private loaderSvc: LoaderService
  ) {

    for (let i = 0; i < 4; i++) { this.workDayArr.push(this.workDayGroup()); }

    this.workDayArr.push(this.fb.group({
      morning_1: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      morning_2: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      afternoon_1: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      afternoon_2: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
    }));
   }

  ngOnInit(): void {
    this.fullTimeSvc.getFullTime(this.id_full_time).subscribe({
      next: (res: any) => {
        this.work_plan = res.work_plan;

        if(this.work_plan) {
          this.id_full_time = this.work_plan.id;
          this.f_workplan.patchValue({
            semester: this.work_plan.semester,
            register: this.work_plan.register,
            part_time: this.work_plan.part_time,
            general_remarks: this.work_plan.general_remarks
          });

          this.patchTeachingActivities(this.work_plan.teaching_activities);
          this.patchInvestigationActivities(this.work_plan.investigation_activities);
          this.patchExtensionActivities(this.work_plan.extension_activities);
          this.patchAcademicAdministration(this.work_plan.academic_admin_activities);
          this.patchOtherActivities(this.work_plan.other_activities);
          this.patchMonitoringActivities(this.work_plan.monitoring_activities);
          this.patchWorkDay(this.work_plan.work_day);
        }
      }
    });


  }

  // ------------------------------
  // --------- ENVIAR -------------
  // ------------------------------

  onSubmit() {
    const WORK_PLAN: WorkPlan = {
      ... this.f_workplan.value as unknown as WorkPlan,
          
    }

    this.loaderSvc.show();

  

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
      number_students: [NaN, [Validators.required]],
      level: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      hours_week: this.fb.group({
        T: [NaN, [Validators.required]],
        TP: [NaN, [Validators.required]],
        P: [NaN, [Validators.required]],
      }),
      total_hours: this.fb.group({
        weekly: [NaN, [Validators.required]],
        biannual: [NaN, [Validators.required]],
      })
    });
  }

  // --------- ADD CARDS -----------

  addTeachingActivities() { this.teachingActivitiesArr.push(this.teachingActivitiesGroup()); }

  // --------- PATCHS -----------

  patchTeachingActivities(activity: any) {
    for (let i = 0; i < activity.length - 1; i++) {
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
      responsibility: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      cost: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      support_certificate: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      semester_hours: [NaN, [Validators.required]],
    });
  }

  // --------- ADD CARDS -----------

  addInvestigationActivities() { this.investigationActivitiesArr.push(this.investigationActivitiesGroup()); }

  // --------- PATCHS -----------

  patchInvestigationActivities(activity: any) {
    for (let i = 0; i < activity.length -1; i++) {
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
      hours_week: [NaN, [Validators.required]],
      semester_hours: [NaN, [Validators.required]],
    });
  }

  // --------- ADD CARDS -----------

  addExtensionActivities() { this.extensionActivitiesArr.push(this.extensionActivitiesGroup()); }

  // --------- PATCHS -----------

  patchExtensionActivities(activity: any) {
    for (let i = 0; i < activity.length -1 ; i++) {
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
      charge: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      semester_hours: [NaN, [Validators.required]],
      other_activities: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      other_hours_semester: [NaN, [Validators.required]],
    });
  }

  // --------- ADD CARDS -----------

  addAcademicAdministration() { this.academicAdministrationArr.push(this.academicAdministrationGroup()); }

  // --------- PATCHS -----------

  patchAcademicAdministration(activity: any) {
    for (let i = 0; i < activity.length -1 ; i++) {
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
      activity_identification:  ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      semester_hours: [NaN, [Validators.required]],
    });
  }

  // --------- ADD CARDS -----------

  addOtherActivities() { this.otherActivitiesArr.push(this.otherActivitiesGroup()); }

  // --------- PATCHS -----------

  patchOtherActivities(activity: any) {
    for (let i = 0; i < activity.length -1 ; i++) {
      this.addOtherActivities();
    }
    this.otherActivitiesArr.patchValue(activity);
  }




  // --------------------------------
  // -- SEGUIMIENTO ACTIVIDADES  ----
  // --------------------------------

  // --------- GROUPS -----------

  monitoringActivitiesGroup() {
    return this.fb.group({
      activity_identification: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      date_1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      date_2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      others: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
    });
  }

  // --------- ADD CARDS -----------

  addMonitoringActivities() { this.monitoringActivitiesArr.push(this.monitoringActivitiesGroup()); }

  // --------- PATCHS -----------

  patchMonitoringActivities(activity: any) {
    for (let i = 0; i < activity.length -1 ; i++) {
      this.addMonitoringActivities();
    }
    this.monitoringActivitiesArr.patchValue(activity);
  }




  // --------------------------------
  // ----- JORNADA DE TRABAJO  ------
  // --------------------------------

  // --------- GROUPS -----------

  workDayGroup() {
    return this.fb.group({
      morning_1: ['07:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      morning_2: ['12:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      afternoon_1: ['13:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
      afternoon_2: ['17:00', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]],
    });
    
  }

  // --------- ADD CARDS -----------

  addWorkDay() { this.workDayArr.push(this.workDayGroup()); }

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

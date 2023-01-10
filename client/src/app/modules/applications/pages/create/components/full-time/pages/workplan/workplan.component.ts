import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { WorkPlan } from '@interfaces/applications/full_time/work-plan';
import { FullTimeService } from '@services/applications/full_time/full-time.service';

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
    teaching_activities: this.fb.array([this.teachingActivitiesGroup()], [Validators.required]),
    investigation_activities: this.fb.array([this.investigationActivitiesGroup()], [Validators.required]),
    extension_activities: this.fb.array([this.extensionActivitiesGroup()], [Validators.required]),
    academic_admin_activities: this.fb.array([this.academicAdministrationGroup()], [Validators.required]),
    other_activities:  this.fb.array([this.otherActivitiesGroup()], [Validators.required]),
    monitoring_activities: this.fb.array([this.monitoringActivitiesGroup()], [Validators.required]),
    work_day: this.fb.array([this.workDayGroup()], [Validators.required]),
  });

  // ------------------------------
  // --------- GETTERS -----------
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
    private fullTimeSvc: FullTimeService 
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
    // this.fullTimeSvc.getFullTime()

  }

  // ------------------------------
  // --------- ENVIAR -------------
  // ------------------------------

  onSubmit() {
    // const WORK_PLAN: WorkPlan = {
    //   ... this.f_workplan.value as WorkPlan,
          
    // }
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

  addTeachingActivities() {
    let div = document.getElementById('c1')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.teachingActivitiesArr.push(this.teachingActivitiesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

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

  addInvestigationActivities() {
    let div = document.getElementById('c8')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.investigationActivitiesArr.push(this.investigationActivitiesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

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

  addExtensionActivities() {
    let div = document.getElementById('c2')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.extensionActivitiesArr.push(this.extensionActivitiesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

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

  addAcademicAdministration() {
    let div = document.getElementById('c3')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.academicAdministrationArr.push(this.academicAdministrationGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

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

  addOtherActivities() {
    let div = document.getElementById('c4')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.otherActivitiesArr.push(this.otherActivitiesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

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

  addMonitoringActivities() {
    let div = document.getElementById('c5') 
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.monitoringActivitiesArr.push(this.monitoringActivitiesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

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

  addWorkDay() {
    this.workDayArr.push(this.workDayGroup());
  }

  // --------- PATCHS -----------

  patchJornadaTrabajo(activity: any) {
    this.workDayArr.patchValue(activity);
  }

  

  // ------------------------------
  // -------- REMOVE CARDS --------
  // ------------------------------

  removeInput(controlName: string, index: number) {
    const control = this.f_workplan.get(controlName) as FormArray;
    control.removeAt(index);
  }

}

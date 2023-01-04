import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';

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
    research_activities: this.fb.array([this.researchActivitiesGroup()], [Validators.required]),
    extension_activities: this.fb.array([this.extensionActivitiesGroup()], [Validators.required]),
  });

  // ------------------------------
  // --------- GETTERS -----------
  // ------------------------------

  get teachingActivitiesArr(): FormArray {
    return this.f_workplan.get('teaching_activities') as FormArray;
  }

  get researchActivitiesArr(): FormArray {
    return this.f_workplan.get('research_activities') as FormArray;
  }

  get extensionActivitiesArr(): FormArray {
    return this.f_workplan.get('extension_activities') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  
  onSubmit() {

  }

  // ------------------------------
  // --------- GROUPS -----------
  // ------------------------------

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

  researchActivitiesGroup() {
    return this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      project_identification: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      responsibility: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      cost: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      support_certificate: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      semester_hours: [NaN, [Validators.required]],
    });
  }

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

  // ------------------------------
  // --------- ADD CARDS -----------
  // ------------------------------

  addTeachingActivities() {
    let div = document.getElementById('c1')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.teachingActivitiesArr.push(this.teachingActivitiesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

  addResearchActivities() {
    let div = document.getElementById('c8')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.researchActivitiesArr.push(this.researchActivitiesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }

  addExtensionActivities() {
    let div = document.getElementById('c2')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.extensionActivitiesArr.push(this.extensionActivitiesGroup());
      setTimeout(() => div!.scrollTop = div!.scrollHeight, 100);
    }
  }


  // ------------------------------
  // --------- PATCHS -----------
  // ------------------------------

  patchTeachingActivities(activity: any) {
    for (let i = 0; i < activity.length - 1; i++) {
      this.addTeachingActivities();
    }
    this.teachingActivitiesArr.patchValue(activity);
  }

  patchResearchActivities(activity: any) {
    for (let i = 0; i < activity.length -1; i++) {
      this.addResearchActivities();
    }
    this.researchActivitiesArr.patchValue(activity);
  }

  patchActividadesExtension(activity: any) {
    for (let i = 0; i < activity.length -1 ; i++) {
      this.addExtensionActivities();
    }
    this.extensionActivitiesArr.patchValue(activity);
  }

  // ------------------------------
  // -------- REMOVE CARDS --------
  // ------------------------------

  removeInput(controlName: string, index: number) {
    const control = this.f_workplan.get(controlName) as FormArray;
    control.removeAt(index);
  }

}

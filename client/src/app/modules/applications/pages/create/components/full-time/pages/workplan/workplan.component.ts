import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    teaching_activities: this.fb.array([this.TeachingActivitiesGroup()], [Validators.required]),
  });

  // ------------------------------
  // --------- GETTERS -----------
  // ------------------------------

  get teachingActivitiesArr(): FormArray {
    return this.f_workplan.get('teaching_activities') as FormArray;
  }

  @ViewChild('c1')
  private c1!: ElementRef;

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

  TeachingActivitiesGroup() {
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
    })
  }

  // ------------------------------
  // --------- ADD CARDS -----------
  // ------------------------------

  addTeachingActivities() {
    let div = document.getElementById('c1')
    if (div) {
      let height = div.clientHeight;
      div.style.maxHeight = height + 'px';
      this.teachingActivitiesArr.push(this.TeachingActivitiesGroup());
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

  // ------------------------------
  // -------- REMOVE CARDS --------
  // ------------------------------

  removeInput(controlName: string, index: number) {
    const control = this.f_workplan.get(controlName) as FormArray;
    control.removeAt(index);
  }

}

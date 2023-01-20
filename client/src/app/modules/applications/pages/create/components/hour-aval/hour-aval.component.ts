import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Applicant } from '@interfaces/applications/hour_aval';
import { UserByPass } from '@interfaces/user';
import { HourAvalService } from '@services/applications/hour-aval.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-hour-aval',
  templateUrl: './hour-aval.component.html',
  styleUrls: ['./hour-aval.component.scss']
})
export class HourAvalComponent {
  files: any[] = [];

  products: string[] = [];

  submitted = false;

  usersByPass: UserByPass[] = [];

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private hourAvalSvc: HourAvalService,
    private userSvc: UserService
  ) {
    this.form = this.formBuilder.group({
      time: [NaN, [Validators.required, Validators.max(300), Validators.min(1)]],
      hours_week: [NaN, [Validators.required, Validators.max(48), Validators.min(1)]],
      description: ['', [Validators.required, Validators.min(30), Validators.max(500)]],
      entity: ['', [Validators.required, Validators.min(3), Validators.max(255)]],
      role: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      products: this.formBuilder.array([this.productsGroup()], [Validators.required])
    })
  }


  submit() { }

  // searchByPass(event: any) { 
  //   this.userSvc.getByPass(event.target.value).subscribe({
  //     next: data => this.usersByPass.push(data)
  //     error: 
  //   })
  // }

  // Objetives array

  productsGroup() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]]
    });
  }

  get productsArr(): FormArray {
    return this.form.get('products') as FormArray;
  }

  addInputproducts() {
    this.productsArr.push(this.productsGroup());
  }


  // Remove from control
  removeInput(controlName: string, index: number) {
    const control = this.form.get(controlName) as FormArray;
    control.removeAt(index);
  }


  // Validations
  isInvalidForm(controlName: string) {
    return this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched;
  }

  get f() {
    return this.form.controls
  }

  validSize() {
    return true;
  }

  validFileType() {
    return true;
  }
}

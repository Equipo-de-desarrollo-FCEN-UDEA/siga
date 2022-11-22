import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public loading: boolean = false;
  public error: string = '';
  public submitted: boolean = false;

  public createUserForm: FormGroup = this.formBuilder.group({
    last_name: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required]],
    id_type: ['', Validators.required],
    id: ['', Validators.required],
    phone_number: ['', Validators.required],
    rol: ['', Validators.required],
    department_id: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(250)],
    ],
    confirm_password: [],
  });

  get f() {
    return this.createUserForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  validatePassword() {
    return (
      this.createUserForm.get('password')?.touched &&
      this.createUserForm.get('password')?.value !=
        this.createUserForm.get('confirm_password')?.value
    );
  }

  onSubmit() {
    this.submitted = true;

    // verificacion de errores
    if (this.createUserForm.invalid) {
      return;
    }
  }
}

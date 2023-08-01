import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IUserApplication } from '@interfaces/user_application_interface';

@Component({
  selector: 'app-user-application-status',
  templateUrl: './user-application-status.component.html',
  styleUrls: ['./user-application-status.component.scss']
})
export class UserApplicationStatusComponent {

  public form = this.fb.group({
    response: [''],
    amount_approved: ['']
  });

  constructor(
    private fb: FormBuilder,
  ) { }


}

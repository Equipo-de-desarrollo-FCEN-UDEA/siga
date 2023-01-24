import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserByPass } from '@interfaces/user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent {
  public user: FormGroup;
  public role: FormGroup;
  public userBypass!: UserByPass;
  public error = ''
  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private activeModal: NgbActiveModal
  ) {
    this.user = this.formBuilder.group({
      email: ['', [Validators.required]]
    })
    this.role = this.formBuilder.group({
      role: ['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  userSubmit() {
    this.userSvc.getByPass(this.user.value.email).subscribe({
      next: data => this.userBypass = data,
      error: err => this.error = 'No se encontró el usuario'
    })
  }

  submit() {
    this.activeModal.close({
      email: this.user.value.email,
      role: this.role.value.role
    })
  }

  cancel(){
    this.activeModal.dismiss('Dismiss modal')
  }

}

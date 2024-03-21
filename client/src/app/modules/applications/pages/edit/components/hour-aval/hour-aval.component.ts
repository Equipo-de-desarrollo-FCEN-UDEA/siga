import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant, HourAvalCreate } from '@interfaces/applications/hour_aval';
import { UserByPass, UserResponse } from '@interfaces/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HourAvalService } from '@services/applications/hour-aval.service';
import { UserService } from '@services/user.service';
import { ApplicantsComponent } from '@shared/components/applicants/applicants.component';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hour-aval',
  templateUrl: './hour-aval.component.html',
  styleUrls: ['./hour-aval.component.scss']
})
export class HourAvalComponent {
  products: string[] = [];

  submitted = false;

  usersByPass: UserByPass[] = [];

  applicants: Applicant[] = [];

  public user$: Observable<UserResponse> = this.userSvc.getUser();
  private user!: UserResponse;

  public form: FormGroup;

  private id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private hourAvalSvc: HourAvalService,
    private userSvc: UserService,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      time: [NaN, [Validators.required, Validators.max(300), Validators.min(1)]],
      hours_week: [NaN, [Validators.required, Validators.max(168), Validators.min(1)]],
      announcement: ['', [Validators.required, Validators.maxLength(1000)]],
      title: ['', [Validators.required, Validators.min(3), Validators.max(255)]],
      description: ['', [Validators.required, Validators.min(30), Validators.max(500)]],
      entity: ['', [Validators.required, Validators.min(3), Validators.max(255)]],
      role: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      backrest: [''],
      products: this.formBuilder.array([this.productsGroup()], [Validators.required]),
      another_applicants: [this.applicants]
    },
      { Validators: this.backrestValidator }
    )
    this.userSvc.getUser().subscribe(user => this.user = user)

    this.route.parent?.params.subscribe(params => { this.id = params['id'] })
    this.hourAvalSvc.getHourAval(this.id).subscribe(
      application => {
        this.form.patchValue(application.hour_aval);
        this.applicants = application.hour_aval.another_applicants!;
        this.patchProducts(application.hour_aval.products)
      }
    )
  }

  backrestValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return (this.user.scale.toUpperCase() != 'PROFESOR ASOCIADO' && control.get('backrest')) ? null : { notmatched: true }
  }

  open() {
    let resultModal = this.modal.open(ApplicantsComponent)
    resultModal.result.then(
      (res: Applicant) => this.applicants.push(res)
    ).catch(res => { })
  }

  removeApplicant(i: number) {
    this.applicants.splice(i, 1)
  }


  submit() {
    if (this.form.invalid) {
      this.submitted = true
      return;
    }

    this.hourAvalSvc.putHourAval(this.id, this.form.value as HourAvalCreate).subscribe({
      next: data => {
        Swal.fire({
          title: 'Solicitud Actualizada',
          text: 'Su solicitud fue actualizada con éxito',
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(
          response => {
            if (response.isConfirmed) {
              this.router.navigate([`/solicitudes/ver/${this.id}/avalhoras`])
            }
          }
        )
      }
    })

  }

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

  // patch Products
  patchProducts(products: any[]) {
    for (let i = 0; i < products.length - 1; i++) {
      this.addInputproducts();
    }
    this.productsArr.patchValue(products);
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

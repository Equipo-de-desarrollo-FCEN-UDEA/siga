import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { APPLICATION_FOR } from '@modules/applications/pages/create/components/economic-support/data/economic-support';
import { EconomicSupportService } from '@services/applications/economic-support.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent {
  public APPLICATION_FOR = APPLICATION_FOR;

  public id: number = 0;

  public form = this.fb.group({
    application_for: ['', [Validators.required]],
    name: ['', [Validators.required]],
    identification_number: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    landline: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    institution: ['', [Validators.required]],
    academic_unit: ['', [Validators.required]],
  });

  @Output() submitted = false;
  @Output() sendForm = new EventEmitter<any>();

  // Acceder a los form
  get f() {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private economicSupportSvc: EconomicSupportService
  ) {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.economicSupportSvc.getEconomicSupport(this.id).subscribe((data) => {
        this.form.patchValue({
          application_for: data.economic_support.personal_data.application_for,
          name: data.economic_support.personal_data.name,
          identification_number: data.economic_support.personal_data.identification_number,
          phone: data.economic_support.personal_data.phone,
          landline: data.economic_support.personal_data.landline,
          email: data.economic_support.personal_data.email,
          address: data.economic_support.personal_data.address,
          city: data.economic_support.personal_data.city,
          institution: data.economic_support.personal_data.institution,
          academic_unit: data.economic_support.personal_data.academic_unit,
        });
      });
    });
  }

  send() {
    this.sendForm.emit(this.form.value);
  }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() {
    this.submitted = true;
    return this.form.value;
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }
}

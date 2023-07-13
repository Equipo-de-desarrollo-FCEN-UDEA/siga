import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ECONOMIC_SUPPORT_TYPE } from '@modules/applications/pages/create/components/economic-support/data/economic-support';
import { EconomicSupportService } from '@services/applications/economic-support.service';

@Component({
  selector: 'app-application-data',
  templateUrl: './application-data.component.html',
  styleUrls: ['./application-data.component.scss'],
})
export class ApplicationDataComponent {
  get f() {
    return this.form.controls;
  }
  
  public id:number = 0;

  public ECONOMIC_SUPPORT_TYPE = ECONOMIC_SUPPORT_TYPE;

  public form = this.fb.group({
    application_type: ['', [Validators.required]],
    project: ['', [Validators.required]],
    goal: ['', [Validators.required]],
  });

  @Output() submitted = false;
  @Output() sendForm = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private economicSupportSvc: EconomicSupportService
  ) {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.economicSupportSvc.getEconomicSupport(this.id).subscribe((data) => {
        //console.log(data);
        this.form.patchValue({
          application_type: data.economic_support.application_data.application_type,
          project: data.economic_support.application_data.project,
          goal: data.economic_support.application_data.goal,
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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ECONOMIC_SUPPORT_TYPE } from '../../data/economic-support';
import { EconomicSupportComponent } from '../../economic-support.component';


@Component({
  selector: 'app-application-data',
  templateUrl: './application-data.component.html',
  styleUrls: ['./application-data.component.scss'],
})
export class ApplicationDataComponent {
  get f() {
    return this.form.controls;
  }

  public ECONOMIC_SUPPORT_TYPE = ECONOMIC_SUPPORT_TYPE;

  public form = this.fb.group({
    application_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    project: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    goal: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
  });

  @Output() submitted = false;
  @Output() sendForm = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    
    
  ) {}

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

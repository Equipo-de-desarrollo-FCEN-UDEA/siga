import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ECONOMIC_SUPPORT_TYPE } from '../../data/economic-support';
import { ApplicationTypesService } from '@services/application-types.service';

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
    application_type: ['', [Validators.required]],
    project: ['', [Validators.required]],
    goal: ['', [Validators.required]],
  });

  @Output() sendForm = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    
    private applicationTypeSvc: ApplicationTypesService
  ) {}

  send() {
    this.sendForm.emit(this.form.value);
  }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() {
    return this.form.value;
  }
}

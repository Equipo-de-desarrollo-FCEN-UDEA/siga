import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationTypesService } from '@services/application-types.service';

@Component({
  selector: 'app-subtype',
  templateUrl: './subtype.component.html',
  styleUrls: ['./subtype.component.scss'],
})
export class SubtypeComponent {
  public applicationType$ = this.applicationTypeSvc.getApplicationType(6);

  public form = this.fb.group({
    application_sub_type_id: [16, [Validators.required]],
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

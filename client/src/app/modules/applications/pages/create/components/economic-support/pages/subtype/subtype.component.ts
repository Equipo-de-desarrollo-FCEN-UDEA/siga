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
    application_sub_type_id: [0, [Validators.required]],
  });

  @Output() sendForm = new EventEmitter<any>();
  @Output() submitted = false;
  
  get f() {
    return this.form.controls;
  }
  
  constructor(
    private fb: FormBuilder,
    private applicationTypeSvc: ApplicationTypesService
  ) {}

  send() {
    this.sendForm.emit(this.form.value.application_sub_type_id);
  }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() {
    this.submitted = true;
    return this.form.value.application_sub_type_id;
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }
}

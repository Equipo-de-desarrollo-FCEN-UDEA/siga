import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationTypesService } from '@services/application-types.service';

@Component({
  selector: 'app-subtype',
  templateUrl: './subtype.component.html',
  styleUrls: ['./subtype.component.scss'],
})
export class SubtypeComponent implements OnInit {
  public applicationType$ = this.applicationTypeSvc.getApplicationType(6);

  public subtype: number[] = [];

  @Output() sendForm = new EventEmitter<any>();
  @Output() submitted = false;

  public form = this.fb.group({
    application_sub_type_id: ['', [Validators.required]],
  });

  constructor(
    private applicationTypeSvc: ApplicationTypesService,
    private fb: FormBuilder) {}


  send() {
    this.sendForm.emit(this.form.value);
  }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() {
    this.submitted = true;
    return this.form.value;
  }

  ngOnInit(): void {}
}

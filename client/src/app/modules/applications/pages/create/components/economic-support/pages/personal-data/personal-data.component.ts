import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APPLICATION_FOR } from '../../data/economic-support';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent {

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

  @Output() sendForm = new EventEmitter<any>();
  
  constructor( private fb: FormBuilder ) { }

  send() { this.sendForm.emit(this.form.value) }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() { return this.form.value }
  
}

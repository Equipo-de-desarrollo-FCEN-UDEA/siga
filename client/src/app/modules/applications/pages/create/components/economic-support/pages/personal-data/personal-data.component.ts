import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { APPLICATION_FOR } from '../../data/economic-support';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent {

  public APPLICATION_FOR = APPLICATION_FOR;

  public form = this.fb.group({
    application_for: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    identification_number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    landline: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    institution: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    academic_unit: ['', [Validators.minLength(1), Validators.maxLength(50)]],
  });

  @Output() submitted = false;
  @Output() sendForm = new EventEmitter<any>();


    // Acceder a los form
  get f() { return this.form.controls; }
  constructor( private fb: FormBuilder ) { }

  send() { this.sendForm.emit(this.form.value) }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() { 
    this.submitted = true;
    return this.form.value 
  }

  isInvalidForm(controlName: string) {
    return (
      this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched
    );
  }
  
}

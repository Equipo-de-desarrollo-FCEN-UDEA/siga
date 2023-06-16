import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationTypesService } from '@services/application-types.service';
import { ExtraService } from '@services/extra.service';

@Component({
  selector: 'app-subtype',
  templateUrl: './subtype.component.html',
  styleUrls: ['./subtype.component.scss'],
})
export class SubtypeComponent {
  public applicationType$ = this.applicationTypeSvc.getApplicationType(6);
  public investigationGroup$ = this.extraSvc.getInvestigationGroups();

  public subtype: number = 0;

  @Output() sendForm = new EventEmitter<any>();
  @Output() submitted = false;

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private applicationTypeSvc: ApplicationTypesService,
    private extraSvc: ExtraService
  ) {}

  public form = this.fb.group({
    name: [''],
  });

  // onCheckboxChange(event: any, id: number) {
  //   if (event.target.checked) {
  //     if (!this.subtype.includes(id)) {
  //       this.subtype.push(id);
  //       //onsole.log(this.subtype);
  //     }
  //   } else {
  //     if (this.subtype.includes(id)) {
  //       this.subtype.splice(this.subtype.indexOf(id), 1);
  //       //console.log(this.subtype);
  //     }
  //     //console.log(id);
  //   }
  //   console.log(this.subtype);
  // }

  // send() {
  //   this.sendForm.emit(this.subtype);
  // }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() {
    this.submitted = true;
    //this.form.get('application_sub_type_id')?.setValue(this.subtype);
    return this.subtype;
  }

  sendInvestigationGroup() {
    return this.form.value;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IDependence } from '@interfaces/applications/economic_support-interface';
import { ApplicationTypesService } from '@services/application-types.service';
import { ExtraService } from '@services/extra.service';
import { DEPENDENCIES } from '../../data/subtype';

@Component({
  selector: 'app-subtype',
  templateUrl: './subtype.component.html',
  styleUrls: ['./subtype.component.scss'],
})
export class SubtypeComponent {
  public applicationType$ = this.applicationTypeSvc.getApplicationType(6);
  public investigationGroup$ = this.extraSvc.getInvestigationGroups();

  public dependencies: IDependence[] = [];
  public researchGroup: any[] = [];

  public dependenciesTemp: IDependence[] = [];
  public researchGroupTemp: any[] = [];

  @Output() sendForm = new EventEmitter<any>();
  @Output() submitted = false;

  public SUBTYPES = DEPENDENCIES;

  constructor(
    private applicationTypeSvc: ApplicationTypesService,
    private extraSvc: ExtraService
  ) {
    this.investigationGroup$.subscribe((data) => {
      this.researchGroup = data;
      console.log(this.researchGroup);
    });
  }

  onCheckboxChange(event: any, dependence: IDependence) {
    if (event.target.checked) {
      if (!this.dependenciesTemp.includes(dependence)) {
        this.dependenciesTemp.push(dependence);
      }
    } else {
      if (this.dependenciesTemp.includes(dependence)) {
        this.dependenciesTemp.splice(this.dependenciesTemp.indexOf(dependence), 1);
      }
    }
    //this.dependencies = this.dependenciesTemp.concat(this.researchGroupTemp);
    console.log(this.dependenciesTemp);
  }

  onSelectDependencie(selectedValue: any) {
    let dependence = this.researchGroup.find(
      (investigation) => investigation.name === selectedValue.target.value
    );
    if (selectedValue.target.value === 'Ninguno') {
      this.researchGroupTemp = [];
    }
    else if (selectedValue && dependence) {
      let newDependence = {
        id: dependence.coordinador_id,
        name: dependence.name,
      };
      if (!this.researchGroupTemp.find((dep) => dep.id === newDependence.id)) {
        this.researchGroupTemp = [];
        this.researchGroupTemp.push(newDependence);
      };
    } 
    //this.dependencies = this.dependenciesTemp.concat(this.researchGroupTemp);
    console.log(this.researchGroupTemp);
  }

  send() {
    this.sendForm.emit(this.dependencies);
  }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() {
    this.submitted = true;
    this.dependencies = this.dependenciesTemp.concat(this.researchGroupTemp);
    //this.form.get('application_sub_type_id')?.setValue(this.subtype);
    return this.dependencies;
  }
}

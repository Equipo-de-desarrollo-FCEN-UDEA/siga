import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IDependence, ISubdepartment } from '@interfaces/applications/economic_support-interface';
import { ApplicationTypesService } from '@services/application-types.service';
import { ExtraService } from '@services/extra.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-subtype',
  templateUrl: './subtype.component.html',
  styleUrls: ['./subtype.component.scss'],
})
export class SubtypeComponent {
  public applicationType$ = this.applicationTypeSvc.getApplicationType(6);

  public dependencies: IDependence[] = [];
  public subdeparments: ISubdepartment[] = [];

  @Output() sendForm = new EventEmitter<any>();
  @Output() submitted = false;

  constructor(
    private applicationTypeSvc: ApplicationTypesService,
    private userSvc: UserService,
    private extraSvc: ExtraService
  ) {
    this.userSvc.getUser().subscribe((data) => {
      this.extraSvc.getSubdepartmentsByDepartment(data.department_id).subscribe((data) => {
        this.subdeparments = data;
      });
    });
  }

  onCheckboxChange(event: any, dependence: ISubdepartment) {
    let newDependence = {
      id: dependence.coordinador_id,
      name: dependence.name
    };

    if (event.target.checked) {
      if (!this.dependencies.includes(newDependence)) {
        this.dependencies.push(newDependence);
      }
    } else {
      const index = this.dependencies.findIndex(dep => dep.id === newDependence.id);
      if (index !== -1) {
        this.dependencies.splice(index, 1);
      }
    }

  }


  send() {
    this.sendForm.emit(this.dependencies);
  }

  //ENVIA EL FORMULARIO AL COMPONENTE PADRE EN ESTE CASO ECONOMIC SUPPORT COMPONENT
  sendForms() {
    this.submitted = true;
    return this.dependencies;
  }
}

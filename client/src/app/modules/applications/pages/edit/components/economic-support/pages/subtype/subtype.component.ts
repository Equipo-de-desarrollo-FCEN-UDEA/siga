import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IDependence,
  ISubdepartment,
} from '@interfaces/applications/economic_support-interface';
import { ApplicationTypesService } from '@services/application-types.service';
import { EconomicSupportService } from '@services/applications/economic-support.service';
import { ExtraService } from '@services/extra.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-subtype',
  templateUrl: './subtype.component.html',
  styleUrls: ['./subtype.component.scss'],
})
export class SubtypeComponent implements OnInit {
  public applicationType$ = this.applicationTypeSvc.getApplicationType(6);

  public dependencies: IDependence[] = [];
  public subdeparments: ISubdepartment[] = [];

  public id: number = 0;

  @Output() sendForm = new EventEmitter<any>();
  @Output() submitted = false;

  constructor(
    private applicationTypeSvc: ApplicationTypesService,
    private economicSupportSvc: EconomicSupportService,
    private extraSvc: ExtraService,
    private route: ActivatedRoute,
    private userSvc: UserService,
  ) {
    this.userSvc.getUser().subscribe((data) => {
      this.extraSvc
        .getSubdepartmentsByDepartment(data.department_id)
        .subscribe((data) => {
          this.subdeparments = data;
          //console.log(this.subdeparments);
        });
    });
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.id = params['id'];
      this.economicSupportSvc.getEconomicSupport(this.id).subscribe((data) => {
        //this.dependence = data.economic_support.dependence;
      });
    });
  }

  onCheckboxChange(event: any, dependence: ISubdepartment) {
    let newDependence = {
      id: dependence.coordinador_id,
      name: dependence.name,
    };

    if (event.target.checked) {
      if (!this.dependencies.includes(newDependence)) {
        this.dependencies.push(newDependence);
      }
    } else {
      const index = this.dependencies.findIndex(
        (dep) => dep.id === newDependence.id
      );
      if (index !== -1) {
        this.dependencies.splice(index, 1);
      }
    }

    console.log(this.dependencies);
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

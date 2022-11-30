//angular
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//rxjs
import { Observable } from 'rxjs';

//interfaces
import { ApplicationType } from '@interfaces/application_type';

//services
import { ApplicationTypesService } from '@services/application-types.service';
import { LoaderService } from '@services/loader.service';


@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss'],
})
export class CreateApplicationComponent {


  public is_loading = this.loaderSvc.isLoading;
  public submitted:boolean = false;
  public form!: FormGroup;

  public application_type$: Observable<ApplicationType[]> =
    this.applicationType.getApplicationTypes();

  public create_application_form: FormGroup = this.formBuilder.group({
    application_type: ['', Validators.required]
  });

  get f() { return this.create_application_form.controls; }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loaderSvc: LoaderService,
    private applicationType: ApplicationTypesService
  ) {}

  onSubmitApplication() {
    if (this.create_application_form.invalid) { return; }
  }

}

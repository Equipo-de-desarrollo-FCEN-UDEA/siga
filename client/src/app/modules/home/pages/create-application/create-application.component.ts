//angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//rxjs
import { Observable } from 'rxjs';

//interfaces
import {
  ApplicationType,
  ApplicationTypeResponse,
} from '@interfaces/application_type';

//services
import { ApplicationTypesService } from '@services/application-types.service';
import { LoaderService } from '@services/loader.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss'],
})
export class CreateApplicationComponent {
  public is_loading = this.loaderSvc.isLoading;
  public submitted: boolean = false;

  public application_types$: Observable<ApplicationType[]> =
    this.applicationTypeSvc.getApplicationTypes();

  public create_application_form: FormGroup = this.formBuilder.group({
    application_type: ['', Validators.required],
  });

  get f() {
    return this.create_application_form.controls;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loaderSvc: LoaderService,
    private applicationTypeSvc: ApplicationTypesService
  ) {}

  onSubmitApplication() {
    this.submitted = true;
    if (this.create_application_form.invalid) { return; }

    this.applicationTypeSvc.getApplicationTypes().subscribe({
      next: () => {
        this.router.navigate([
          '/solicitudes/crear/' +
            this.create_application_form.value.application_type
        ]);
      },
    });
  }
}

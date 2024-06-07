import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Application } from '@interfaces/application';
import { LoaderService } from '@services/loader.service';
import { ApplicationService } from '@services/application.service';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { Location } from '@angular/common';
import { ApplicationTypesService } from '@services/application-types.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
  data: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;

  public applications$ = new Observable<Application[]>();

  public page = 1;

  public limit = 100;

  private skip = (this.page - 1) * this.limit;

  public isSuperUser$ = this.authSvc.isSuperUser$;

  public application_types$ = this.applicationTypeSvc.getApplicationTypes();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,

    private authSvc: AuthService,
    private applicationsSvc: ApplicationService,
    private applicationTypeSvc: ApplicationTypesService
  ) {
    this.authSvc.isSuperUser();
    this.applications$ = this.applicationsSvc.getApplications(
      this.skip,
      this.limit,
      false
    );
  }

  form = this.fb.group({
    search: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    activo: [false],
    type: [null],
  });

  ngOnInit(): void {
    this.loadPage(this.page);

    this.applicationsSvc.getApplications().subscribe((response) => {
      this.data = response;
      this.totalItems = response.length;
    });
  }

  // --------------- Pagination ----------------

  loadPage(page: number) {
    this.skip = 0;
    this.applications$ = this.applicationsSvc.getApplications(
      this.skip,
      this.limit,
      this.form.value.activo!,
      this.form.value.search!,
      this.form.value.type!
    );
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadPage(page);
  }

  // --------------- Pagination ----------------

  // We use this for get with a search criteria
  search() {
    this.page = 1;
    this.skip = (this.page - 1) * this.limit;
    this.applications$ = this.applicationsSvc.getApplications(
      this.skip,
      this.limit,
      this.form.value.activo!,
      this.form.value.search!,
      this.form.value.type!
    );
  }

  filed(id: number) {
    this.applicationsSvc.fileApplication(id).subscribe((data) => this.search());
  }

  cancel() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Application } from '@interfaces/application';
import { LoaderService } from '@services/loader.service';
import { ApplicationService } from '@services/application.service';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';





@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {

  public applications$= new Observable<Application[]>();

  public page = 1;

  public limit = 10;

  private skip = (this.page - 1) * this.limit;
  
  public isLoading = this.loaderSvc.isLoading;

  public isSuperUser$ = this.authSvc.isSuperUser$;

  constructor(
    private applicationsSvc: ApplicationService,
    private router: Router,
    private loaderSvc: LoaderService,
    private fb: FormBuilder,
    private authSvc: AuthService
  ) { 
    this.authSvc.isSuperUser();
    this.applications$ = this.applicationsSvc.getApplications(this.skip, this.limit)
  }

  form = this.fb.group({
    search: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    activo: [true]
  })

  ngOnInit(): void {
  }

  nextPage(){
    this.page++;
    this.skip = (this.page - 1) * this.limit;
    this.applications$ = this.applicationsSvc.getApplications(
      this.skip, 
      this.limit, 
      this.form.value.activo!, 
      this.form.value.search!
    );
  }

  prevPage(){
    this.page--;
    this.skip = (this.page - 1) * this.limit;
    this.applications$ = this.applicationsSvc.getApplications(
      this.skip, 
      this.limit,
      this.form.value.activo!, 
      this.form.value.search!
    );
  }

  // We use this for get with a search criteria
  search() {
    this.page = 1
    this.skip = (this.page - 1) * this.limit;
    this.applications$ = this.applicationsSvc.getApplications(
      this.skip, 
      this.limit,
      this.form.value.activo!, 
      this.form.value.search!
    );
  }


}

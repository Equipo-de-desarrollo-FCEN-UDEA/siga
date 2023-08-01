import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApplicationStatus, ApplicationStatusCreate } from '@interfaces/application_status';
import { Subject } from 'rxjs/internal/Subject';
import { ApplicationService } from './application.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {

  private urlEndpoint = environment.route + 'application-status/'
  public isApproved$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private applicationSvc: ApplicationService
  ) { }

  postApplicationStatus(body: ApplicationStatusCreate) {
    return this.http.post(this.urlEndpoint, body)
  }

  getApplicationStatus(id: number): Observable<ApplicationStatus[]> {
    return this.http.get<ApplicationStatus[]>(this.urlEndpoint + id)
  }

  isApproved(id: number) {
    this.applicationSvc.getApplication(id).subscribe(
      data => this.isApproved$.next(
        data.application_status[0].status.id == 2)
    )
  }
}

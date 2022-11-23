import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApplicationStatusCreate } from '@interfaces/application_status';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {

  private urlEndpoint = environment.route + 'application-status/'

  constructor(
    private http: HttpClient
  ) { }

  postApplicationStatus(body: ApplicationStatusCreate) {
    return this.http.post(this.urlEndpoint, body)
  }
}

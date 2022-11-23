import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApplicationType, ApplicationTypeResponse } from '@interfaces/application_type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationTypesService {

  private urlEndPoint = environment.route + 'application-type/'

  constructor(
    private http: HttpClient
  ) { }

  getApplicationTypes(): Observable<ApplicationType[]>{
    return this.http.get<ApplicationType[]>(this.urlEndPoint)
  }

  getApplicationType(id: number): Observable<ApplicationTypeResponse>  {
    return this.http.get<ApplicationTypeResponse>(this.urlEndPoint + id)
  }
}

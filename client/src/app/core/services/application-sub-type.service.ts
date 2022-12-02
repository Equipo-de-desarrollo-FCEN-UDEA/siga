import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApplicationSubType } from '@interfaces/application_type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSubTypeService {

  private urlEndPoint = environment.route + 'application-sub-type/'

  constructor(
    private http: HttpClient
  ) { }

  getApplicationSubType(id: number): Observable<ApplicationSubType>  {
    return this.http.get<ApplicationSubType>(this.urlEndPoint + id)
  }
}

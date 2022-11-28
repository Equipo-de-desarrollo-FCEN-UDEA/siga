import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Application } from '@interfaces/application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  urlEndPoint: string = environment.route + 'application/'

  constructor(
    private http: HttpClient,
  ) { }

  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(this.urlEndPoint+id)
  }

   // service to get a list o users, with default path params
   getApplications(
    skip: number = 0,
    limit: number = 100,
    active: boolean = true,
    search?: string
  ): Observable<Application[]> 
  {
    let params = new HttpParams()
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    params = params.append('active', active);
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<Application[]>(this.urlEndPoint, { params: params });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Application } from '@interfaces/application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private urlEndPoint: string = environment.route + 'application/'

  constructor(
    private http: HttpClient,
  ) { }

  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(this.urlEndPoint+id)
  }
}

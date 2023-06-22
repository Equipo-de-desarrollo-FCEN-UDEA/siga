import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IUserApplication } from '@interfaces/user_application_interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApplicationService {

  private urlEndPoint = environment.route + 'user_application/'

  constructor(
    private http: HttpClient,
  ) { }

  getUserApplication(id: number): Observable<IUserApplication> {
    return this.http.get<IUserApplication>(this.urlEndPoint + id)
  }
  
}

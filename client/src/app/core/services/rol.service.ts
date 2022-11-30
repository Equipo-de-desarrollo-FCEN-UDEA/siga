//angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//rxjs
import { Observable } from 'rxjs';

//environment
import { environment } from '@environments/environment';

//interfaces
import { RolBase } from '@interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlEndPoint:string = environment.route + 'rol';

  constructor(private http: HttpClient) { }

  getRoles():Observable<RolBase[]> {
    return this.http.get<RolBase[]>(this.urlEndPoint);
  }
}

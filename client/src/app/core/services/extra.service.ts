import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {

  private urlEndPoint = environment.route + 'extra/intern'

  constructor( private http: HttpClient ) { }

  getInvestigationGroups(): Observable<any> {
    return this.http.get(this.urlEndPoint)
  }
}

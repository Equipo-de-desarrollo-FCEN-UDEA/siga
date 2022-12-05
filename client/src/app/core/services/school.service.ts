import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//environment
import { environment } from '@environments/environment';
import { SchoolBase } from '@interfaces/school';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private urlEndPoint:string = environment.route + 'school/intern';

  constructor(private http: HttpClient) { }

  getSchools():Observable<SchoolBase[]> {
    return this.http.get<SchoolBase[]>(this.urlEndPoint);
  }
}

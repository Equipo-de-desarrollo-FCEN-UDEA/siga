//angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//environments
import { environment } from '@environments/environment';

//interfaces
import { DepartmentBase, DepartmentInDB } from '@interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private urlEndPoint:string = environment.route + 'department/intern';

  constructor(private http: HttpClient) { }

  getDepartment():Observable<DepartmentBase[]> {
    return this.http.get<DepartmentBase[]>(this.urlEndPoint);
  }
}

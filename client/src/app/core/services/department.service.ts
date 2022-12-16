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

  private urlEndPoint:string = environment.route + 'department/';

  constructor(private http: HttpClient) { }

  getDepartment():Observable<DepartmentInDB[]> {
    return this.http.get<DepartmentInDB[]>(this.urlEndPoint + 'intern');
  }

  getExposeDepartment(id: number) {
    return this.http.get<DepartmentInDB[]>(this.urlEndPoint + id)
  }

}

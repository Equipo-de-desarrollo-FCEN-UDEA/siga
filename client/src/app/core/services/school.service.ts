import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { SchoolResponse } from '@interfaces/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private urlEndpoint = environment.route + 'school/'
  constructor(
    private http: HttpClient
  ) { }

  getExposeSchools() {
    return this.http.get<SchoolResponse[]>(this.urlEndpoint)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ReportFullTimeCreate, ReportFullTimeResponse } from '@interfaces/applications/report-full-time';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportFullTimeService {

  private urlEndPoint: string = environment.route + 'report-full-time/'

  constructor(
    private http: HttpClient
  ) { }

  getReportFullTime(id: number): Observable<ReportFullTimeResponse> {
    return this.http.get<ReportFullTimeResponse>(this.urlEndPoint + id)
  }

  postReportFullTime(body: ReportFullTimeCreate): Observable<ReportFullTimeResponse> {
    return this.http.post<ReportFullTimeResponse>(this.urlEndPoint, body)
  }

  putReportFullTime(body: ReportFullTimeCreate, id: number) {
    return this.http.put(this.urlEndPoint + id, body)
  }

  deleteReportFullTime(id: number){
    return this.http.delete(this.urlEndPoint + id)
  }
}

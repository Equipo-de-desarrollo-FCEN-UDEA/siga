import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HourAvalCreate, HourAvalResponse, HourAvalUpdate } from '@interfaces/applications/hour_aval';
import { Msg } from '@interfaces/msg';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HourAvalService {

  private urlEndPoint = environment.route + 'hour_aval/';

  constructor(
    private http: HttpClient
  ) { }

  postHourAval(body: HourAvalCreate): Observable<HourAvalResponse> {
    return this.http.post<HourAvalResponse>(this.urlEndPoint, body);
  }

  getHourAval(id: number): Observable<HourAvalResponse> {
    return this.http.get<HourAvalResponse>(this.urlEndPoint + id)
  }

  putHourAval(id: number, body: HourAvalUpdate): Observable<HourAvalResponse> {
    return this.http.put<HourAvalResponse>(this.urlEndPoint + id, body)
  }

  deleteHourAval(id: number): Observable<Msg> {
    return this.http.delete<Msg>(this.urlEndPoint + id)
  }

}

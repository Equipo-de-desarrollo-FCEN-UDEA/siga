import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { FullTimeCreate, FullTimeInDB, FulltimeResponse } from '@interfaces/applications/full_time/full-time';
import { InitialLetter } from '@interfaces/applications/full_time/letter';
import { ViceFormat } from '@interfaces/applications/full_time/vice-format';
import { WorkPlan } from '@interfaces/applications/full_time/work-plan';
import { ApplicationStatusCreate } from '@interfaces/application_status';

@Injectable({
  providedIn: 'root'
})
export class FullTimeService {

  private urlEndPoint = environment.route + 'full-time/'

  constructor(
    private http: HttpClient
  ) { }


  postFullTime(fullTime: FullTimeCreate) {
    return this.http.post<FulltimeResponse>(this.urlEndPoint, fullTime)
  }

  getFullTime(id: number) {
    return this.http.get<FulltimeResponse>(this.urlEndPoint + id)
  }

  putFullTime(id: number) {
    return this.http.put<FullTimeInDB>(this.urlEndPoint + id, id)
  }
  
  deleteFullTime(id: number) {
    return this.http.delete(this.urlEndPoint + id)
  }

  putLetter(letter: InitialLetter, id: number) {
    this.http.put<FullTimeInDB>(this.urlEndPoint + 'letter/' + id, letter)
  }

  putViceFormat(viceFormat: ViceFormat, id: number) {
    this.http.put<FullTimeInDB>(this.urlEndPoint + 'vice-format/' + id, viceFormat)
  }

  putWorkPlan(workPlan: WorkPlan, id: number) {
    this.http.put<FullTimeInDB>(this.urlEndPoint + 'work-plan/' + id, workPlan)
  }


}

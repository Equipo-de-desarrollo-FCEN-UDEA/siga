import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Holiday } from '@interfaces/holiday';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private urlEndPoint:string = environment.route + 'holiday/';

  constructor(private http: HttpClient) { }

  getHolidays():Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.urlEndPoint);
  }
}

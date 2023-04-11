import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { VacationResponse, VacationCreate} from '@interfaces/applications/vacation'
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private urlEndPoint: string = environment.route + 'vacation/'

  constructor( private http: HttpClient)  { }

  getVacation(id: number): Observable<VacationResponse> { return this.http.get<VacationResponse>(this.urlEndPoint + id) }

  postVacation(body: VacationCreate) { return this.http.post<VacationResponse>(this.urlEndPoint, body)}

  putVacation(body: VacationCreate, id: number) { return this.http.put(this.urlEndPoint + id, body)}

  deleteVacation(id: number) { return this.http.delete(this.urlEndPoint + id) }
  
}



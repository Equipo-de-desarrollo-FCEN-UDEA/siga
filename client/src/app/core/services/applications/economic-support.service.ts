import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IEconomicSupportCreate, IEconomicSupportResponse } from '@interfaces/applications/economic_support-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EconomicSupportService {

  private urlEndPoint: string = environment.route + 'economic_support/'
  
  constructor( private http: HttpClient){ }

  getEconomicSupport(id: number): Observable<IEconomicSupportResponse>{
    return this.http.get<IEconomicSupportResponse>(this.urlEndPoint + id)
  }

  postEconomicSupport(body: IEconomicSupportCreate): Observable<IEconomicSupportResponse>{
    return this.http.post<IEconomicSupportResponse>(this.urlEndPoint, body)
  }

  putEconomicSupport(body: IEconomicSupportCreate, id: number){
    return this.http.put(this.urlEndPoint + id, body)
  }

  deleteEconomicSupport(id: number){
    return this.http.delete(this.urlEndPoint + id)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import {
  IEconomicSupportCreate,
  IEconomicSupportResponse,
} from '@interfaces/applications/economic_support-interface';
import { Msg } from '@interfaces/msg';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EconomicSupportService {
  private urlEndPoint: string = environment.route + 'economic_support/';

  constructor(private http: HttpClient) {}

  getEconomicSupport(id: number): Observable<IEconomicSupportResponse> {
    return this.http.get<IEconomicSupportResponse>(this.urlEndPoint + id);
  }

  postEconomicSupport(
    body: IEconomicSupportCreate
  ): Observable<IEconomicSupportResponse> {
    return this.http.post<IEconomicSupportResponse>(this.urlEndPoint, body);
  }

  putEconomicSupport(
    body: IEconomicSupportCreate,
    id: number
  ): Observable<IEconomicSupportResponse> {
    return this.http.put<IEconomicSupportResponse>(this.urlEndPoint + id, body);
  }

  deleteEconomicSupport(id: number): Observable<Msg> {
    return this.http.delete<Msg>(this.urlEndPoint + id);
  }

  downloadZipFile(id: number): void {
    const OPTIONS = { responseType: 'blob' as 'json' as 'json' };

    this.http
      .get<any>(this.urlEndPoint + 'zipfile/' + id, OPTIONS)
      .subscribe((response) => {
        const BLOB = new Blob([response], { type: 'application/zip' });

        // Create a virtual link and click it to trigger the download
        const LINK = document.createElement('a');
        LINK.href = URL.createObjectURL(BLOB);
        LINK.download = 'documents.zip';
        LINK.click();

        // Clean up the URL.createObjectURL() by revoking the object URL
        URL.revokeObjectURL(LINK.href);
      });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DocumentsResponse } from '@interfaces/documents';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private urlEndPoint = environment.route + 'documents/'

  constructor(
    private http: HttpClient
  ) { }

  postDocument(files: File[]): Observable<DocumentsResponse> {
    let body = new FormData();

    for (const file of files) {
      body.append('files', file, file.name);
    }
    return this.http.post<DocumentsResponse>(this.urlEndPoint, body)
  }

  getDocument(path: string) {
    let params = new HttpParams()
    params = params.append('key', path)
    return this.http.get(this.urlEndPoint, { responseType: 'blob', params: params })
  }

  deleteDocument(path: string) {
    let params = new HttpParams()
    params = params.append('key', path)
    return this.http.delete(this.urlEndPoint, { params: params })
  }

}

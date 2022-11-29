import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PermissionResponse, PermissionCreate } from '@interfaces/applications/permission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private urlEndPoint: string = environment.route + 'permission/'

  constructor(
    private http: HttpClient
  ) { }

  getPermission(id: number): Observable<PermissionResponse> {
    return this.http.get<PermissionResponse>(this.urlEndPoint+id)
  }

  postPermission(body: PermissionCreate) {
    return this.http.post(this.urlEndPoint, body)
  }

  putPermission(body: PermissionCreate, id: number) {
    return this.http.put(this.urlEndPoint + id, body)
  }

  deletePermission(id: number) {
    return this.http.delete(this.urlEndPoint + id)
  }
}

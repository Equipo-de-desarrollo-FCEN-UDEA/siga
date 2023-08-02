import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRolService {

  private urlEndPoint = environment.route + 'userrol/'

  constructor(
    private http: HttpClient,
  ) { }
  
  getRoles() {
    return  this.http.get(this.urlEndPoint + 'roles')
  }

}

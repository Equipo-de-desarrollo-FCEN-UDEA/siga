import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreate, UserResponse, UserUpdate } from '@interfaces/user';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Msg } from '@interfaces/msg';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlEndpoint: string = environment.route + 'user/'

  constructor(
    private cookie: CookieService,
    private route: Router,
    private http: HttpClient
  ) { }

  // service for get an user with id, doesn't have a default value to return
  getUser(id: number = 0): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.urlEndpoint + id);
  }

  getActualUser() {
    if (this.cookie.check('user')) {
      const basicUser = JSON.parse(this.cookie.get('user'));
      return basicUser;
    } else {
      this.route.navigate(['auth/login']);
      return false;
    }
  }

  // service to get a list o users, with default path params
  getUsers(
    skip: number = 0,
    limit: number = 100,
    active: boolean = true,
    search?: string
  ): Observable<UserResponse[]> {
    let params = new HttpParams()
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    params = params.append('active', active);
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<UserResponse[]>(this.urlEndpoint, { params: params });
  }

  // service to create a new user
  postUser(body: UserCreate): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.urlEndpoint, body)
  }

  // service to update a user
  putUser(body: UserUpdate, id: number): Observable<UserResponse> {
    return this.http.put<UserResponse>(this.urlEndpoint + id, body)
  }

  // service to delete a user
  deleteUser(id: number): Observable<Msg> {
    return this.http.delete<Msg>(this.urlEndpoint + id)
  }

  newPassword(password: string, confirmPassword: string) {
    let params = new HttpParams();
    params = params.append('password', password);
    params = params.append('confirmpassword', confirmPassword);
    return this.http.patch(this.urlEndpoint + 'new-password', {}, { params: params })
  }

}

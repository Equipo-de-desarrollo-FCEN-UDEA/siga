import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreate, UserResponse, UserUpdate } from '@interfaces/user';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Msg } from '@interfaces/msg';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlEndpoint: string = environment.rute + 'user/'

  constructor(
    private http: HttpClient
  ) { }

  // service for get an user with id, default is 0 that return himself
  getUser(id: number = 0): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.urlEndpoint + id);
  }

  // service to get a list o users, with default path params
  getUsers(
    skip: number = 0,
    limit: number = 100,
    active: boolean = true,
    search?: string
  ): Observable<UserResponse[]> 
  {
    let params = new HttpParams()
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    params = params.append('activo', active);
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

}

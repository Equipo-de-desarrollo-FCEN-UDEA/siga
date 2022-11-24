//angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//rxjs
import { map, Subject } from 'rxjs';

//ngx
import { CookieService } from 'ngx-cookie-service';

//environments
import { environment } from '@environments/environment';

//interfaces
import { Auth, Token } from '@interfaces/auth';

//services
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private prefix = environment.rute + 'login';
  private cookieToken = environment.cookieToken;

  public isLoggedIn$ : Subject<boolean> = new Subject();
  public Logged = new Subject<boolean>();
  public isSuperUser$ = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private cookieSvc: CookieService,
    private router: Router,
    private userSvc: UserService
  ) { 
    this.isLoggedIn()
  }

  login(auth: Auth) {
    const HEADERS = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    );
    const BODY = `username=${auth.username}&password=${auth.password}`;
    return this.http.post<Token>(this.prefix + '/access-token', BODY, { headers: HEADERS }).pipe(
      map(
      (data: Token) => {
        this.cookieSvc.delete(`${this.cookieToken}`, '/', '/');
        this.cookieSvc.set(`_${this.cookieToken}`, data.access_token, data.expires);
        // this.userSvc.getUser().subscribe((user:UserResponse) => {
        //   localStorage.setItem('rol', user.rol_id.name);
        // })
        this.Logged.next(true);
      }
    ));
  }

  isLoggedIn() {
    const TOKEN_CHECK = this.cookieSvc.check(`_${this.cookieToken}`)
    this.Logged.next(TOKEN_CHECK);
    return TOKEN_CHECK
  }

  getToken(): string {
    return this.cookieSvc.get(`_${this.cookieToken}`)
  }

  logOut() {
    this.cookieSvc.deleteAll()
    this.cookieSvc.delete(`${this.cookieToken}`)
    this.isLoggedIn()
    this.router.navigate(['/login'])
  }

  isSuperUser(){
    this.userSvc.getUser(0).subscribe(
      data => this.isSuperUser$.next(data.rol_id < 9)
    )
  }

  forgotPassword(username: string) {
    return this.http.post(`${this.prefix}/password-recovery/${username}`, {
      username:username,
    });
  }
}
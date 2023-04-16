//angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//rxjs
import { map, Observable, Subject } from 'rxjs';

//service
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

//environments
import { environment } from '@environments/environment';

//interfaces
import { Auth, Token } from '@interfaces/auth';
import { Msg } from '@interfaces/msg';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private urlEndPoint = environment.route + 'login/';
  private cookieToken = environment.cookieToken;

  public isLoggedIn$ : Subject<boolean> = new Subject();
  public Logged = new Subject<boolean>();
  public isSuperUser$ = new Subject<boolean>();
  public isDirector$ = new Subject<boolean>();
  


  constructor(
    private http: HttpClient,
    private cookieSvc: CookieService,
    private router: Router,
    private userSvc: UserService
  ) {
    this.isLoggedIn();
    // this.logOut();
    // this.isSuperUser();
  }

  login(auth: Auth) {
    const HEADERS = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    );
    const BODY = `username=${auth.username}&password=${auth.password}`;
    return this.http.post<Token>(this.urlEndPoint + 'access-token', BODY, { headers: HEADERS }).pipe(
      map(
      (data: Token) => {
        this.cookieSvc.delete(`${this.cookieToken}`, '/', '/');
        this.cookieSvc.set(`_${this.cookieToken}`, data.access_token, data.expires, '/');
        this.Logged.next(true);
      }
    ));
  }


  passwordRecovery(email: string): Observable<Msg> {
    return this.http.post<Msg>(this.urlEndPoint + 'password-recovery/' + email, {})
  }


  resetPassword(password: string, token: string): Observable<Msg> {
    return this.http.post<Msg>(this.urlEndPoint + 'reset-password/', { token: token, new_password: password })
  }


  sendActivateEmail(email: string): Observable<Msg> {
    return this.http.post<Msg>(this.urlEndPoint + 'activate-email/' + email, {})
  }


  activateEmail(token: string): Observable<Msg> {
    return this.http.post<Msg>(this.urlEndPoint + 'activate-account/', token)
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
    this.cookieSvc.deleteAll('/')
    this.cookieSvc.delete(`_${this.cookieToken}`, '/', '/')
    this.router.navigate(['auth/login'])
  }


  isSuperUser() {
    this.userSvc.getUser(0).subscribe(
      data => this.isSuperUser$.next(data.rol.scope < 9)
    )
  }

  isDirector() {
    this.userSvc.getUser(0).subscribe(
      data => this.isDirector$.next(data.rol.scope < 9 && data.rol.scope > 5)
    )
  }

  forgotPassword(username: string) {
    return this.http.post(`${this.urlEndPoint}password-recovery/${username}`, {
      username:username,
    });
  }
}
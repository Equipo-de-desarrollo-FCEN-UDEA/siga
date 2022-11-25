import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { Auth, Token } from '@interfaces/auth';
import { Msg } from '@interfaces/msg';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlEndPoint = environment.route + 'login/';
  private cookieToken = environment.cookieToken

  public isLoggedIn$: Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient,
    private cookieSvc: CookieService,
    private router: Router,
    private userSvc: UserService
  ) {
    this.isLoggedIn();
    // this.isSuperUser();
  }

  public Logged = new Subject<boolean>();

  public isSuperUser$ = new Subject<boolean>();

  login(auth: Auth) {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    );
    const body = `username=${auth.username}&password=${auth.password}`;
    return this.http.post<Token>(this.urlEndPoint + 'access-token', body, { headers: headers }).pipe(
      map(
        (data: Token) => {
          this.cookieSvc.delete(`${this.cookieToken}`, '/', '/')
          this.cookieSvc.set(`_${this.cookieToken}`, data.access_token, data.expires)
          this.Logged.next(true);
        }
      ))
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
    const tokenCheck = this.cookieSvc.check(`_${this.cookieToken}`)
    this.Logged.next(tokenCheck)
    return tokenCheck
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


  isSuperUser() {
    this.userSvc.getUser(0).subscribe(
      data => this.isSuperUser$.next(data.rol.scope < 9)
    )
  }

    
  forgotPassword(username: string) {
    return this.http.post(`${this.urlEndPoint}/restorePassword/${username}`, {
      username:username,
    });
  }
}
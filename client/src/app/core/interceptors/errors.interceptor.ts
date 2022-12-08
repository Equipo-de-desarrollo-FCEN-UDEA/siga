import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '@services/auth.service';
import { Msg } from '@interfaces/msg';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((_error: HttpErrorResponse) => {
        let errMsg = '';

        switch (_error.status) {
          case 500:
            Swal.fire({
              title: 'Error del servidor',
              text: _error.error.detail,
              confirmButtonText: 'Aceptar',
              icon: 'error',
            });
            break;
          case 401:
            Swal.fire({
              title: 'Error',
              text: _error.error.detail,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3AB795',
            }).then(
              res => this.router.navigate(['/home'])
            )
            break;
          case 403:
            console.log(_error);
            Swal.fire({
              title: 'Error',
              text: _error.error.detail,
              confirmButtonText: 'Aceptar',
              icon: 'error',
              confirmButtonColor: '#3AB795',
            });
            break;
          case 404:
            Swal.fire({
              title: 'Error',
              text: _error.error.detail,
              confirmButtonText: 'Aceptar',
              icon: 'error'
            }).then(
              res => this.router.navigate(['/home'])
            )
            break;
          case 422:
            console.log(_error);
            Swal.fire({
              title: 'Error',
              text: _error.error.detail[0].msg,
              confirmButtonText: 'Aceptar',
              icon: 'error',
              confirmButtonColor: '#3AB795',
            });
            break;
          default:
            Swal.fire({
              title: 'Error',
              text: _error.error.detail,
              confirmButtonText: 'Aceptar',
              icon: 'error',
              confirmButtonColor: '#3AB795',
            }).then((result) => {
              if (result.isConfirmed) {
                if (
                  _error.error.detail ==
                  'Tu cuenta no se encuentra activa, recuerda revisar tu correo para activarla o pide correo de activación nuevamente'
                ) {
                  Swal.fire({
                    title: 'Enviar correo de activación',
                    text: 'Correo o cédula:',
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off',
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Enviar',
                    showLoaderOnConfirm: true,
                    preConfirm: (email) => {
                      return this.authService
                        .sendActivateEmail(email)
                        .subscribe((res: Msg) => {
                          Swal.fire({
                            title: 'Correo de activación',
                            text: res.msg,
                            icon: 'success',
                          });
                        });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  });
                }
              }
            });
            break;
        }

        // if (_error.status == 500) {
        //   Swal.fire({
        //     title: 'Error del servidor',
        //     text: _error.error.detail,
        //     confirmButtonText: 'Aceptar',
        //     icon: 'error',
        //   });
        // } else {
        //   if (_error.status == 422) {
        //     console.log(_error);
        //     Swal.fire({
        //       title: 'Error',
        //       text: _error.error.detail[0].msg,
        //       confirmButtonText: 'Aceptar',
        //       icon: 'error',
        //       confirmButtonColor: '#3AB795',
        //     });
        //   } else {
        //     if (_error.status == 401 || _error.status == 403) {
        //       console.log(_error);
        //       Swal.fire({
        //         title: 'Error',
        //         text: _error.error.detail,
        //         confirmButtonText: 'Aceptar',
        //         icon: 'error',
        //         confirmButtonColor: '#3AB795',
        //       });
        //     } else {
        //       if (_error.status == 404) {
        //         this.router.navigate(['/not-found']);
        //       }else{
        //         Swal.fire({
        //           title: 'Error',
        //           text: _error.error.detail,
        //           confirmButtonText: 'Aceptar',
        //           icon: 'error',
        //           confirmButtonColor: '#3AB795',
        //         }).then((result) => {
        //           if (result.isConfirmed) {
        //             if (
        //               _error.error.detail ==
        //               'Tu cuenta no se encuentra activa, recuerda revisar tu correo para activarla o pide correo de activación nuevamente'
        //             ) {
        //               Swal.fire({
        //                 title: 'Enviar correo de activación',
        //                 text: 'Correo o cédula:',
        //                 input: 'text',
        //                 inputAttributes: {
        //                   autocapitalize: 'off',
        //                 },
        //                 showCancelButton: true,
        //                 confirmButtonText: 'Enviar',
        //                 showLoaderOnConfirm: true,
        //                 preConfirm: (email) => {
        //                   return this.authService
        //                     .sendActivateEmail(email)
        //                     .subscribe((res: Msg) => {
        //                       Swal.fire({
        //                         title: 'Correo de activación',
        //                         text: res.msg,
        //                         icon: 'success',
        //                       });
        //                     });
        //                 },
        //                 allowOutsideClick: () => !Swal.isLoading(),
        //               });
        //             }
        //           }
        //         });
        //       }

        //     }

        //   }
        // }
        return throwError(_error.error.message);
      })
    );
  }
}

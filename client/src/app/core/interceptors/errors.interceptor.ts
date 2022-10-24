import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(
        (_error : HttpErrorResponse) => {
          let errMsg = '';
          if(_error.status == 500) {
            Swal.fire({
              title: 'Error del servidor',
              text: _error.error.detail,
              confirmButtonText: 'Aceptar',
              icon: 'error'
            })
          } else {
            Swal.fire({
              title: 'Error',
              text: _error.error.detail,
              confirmButtonText: 'Aceptar',
              icon: 'error'
            })
          }
          return throwError(_error.error.message);
        }
      )
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '@services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private loaderSvc: LoaderService
  ) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loaderSvc.show();

    return next.handle(request).pipe(
      finalize(() => this.loaderSvc.hide())
      )
    ;
    
  }
}

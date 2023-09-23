import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  //Comando para crear Interceptor de Time ng g interceptor interceptors/time --flat

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const start = performance.now()
    return next.handle(request)
    .pipe(
      tap( () => {
        const time = (performance.now() - start) + "ms"
        console.log(request.url, time)
      })
    );
  }
}
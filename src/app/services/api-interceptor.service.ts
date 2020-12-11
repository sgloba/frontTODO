import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';




@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService {

  constructor(
    private toastr: ToastrService
  ) { }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      retry(2),
      catchError(err => {
        this.toastr.error(err.message, err.title);
        return throwError(err);
      })
    );
  }
}

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
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let modifiedReq
    if(currentUser) {
      modifiedReq = req.clone({
        headers: req.headers.set('secret_token', currentUser.token)} )
    } else {
        modifiedReq = req
      }

    return next.handle(modifiedReq).pipe(
      retry(2),
      catchError(err => {
        this.toastr.error(err.message, err.title);
        return throwError(err);
      })
    );
  }
}

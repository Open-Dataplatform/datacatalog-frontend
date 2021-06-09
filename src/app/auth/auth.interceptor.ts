import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { UserHandlerService } from "../shared/user/user-handler.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly userHandlerService: UserHandlerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.userHandlerService.getUser())
          .pipe(
            switchMap(user => {
              if (user && user.access_token) {
                req = req.clone({
                  setHeaders: {
                    'Content-Type' : 'application/json; charset=utf-8',
                    'Accept'       : 'application/json',
                    'Authorization': `Bearer ${user.access_token}`,
                  },
                });
              }
              return next.handle(req).pipe(
                tap(() => {}, 
                (err: any) => {
                  if (err instanceof HttpErrorResponse) {
                    console.info('Http error status: ' + err.status)
                  }
                }))
            })
        );
    }
}
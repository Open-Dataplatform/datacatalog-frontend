import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {MessageNotifierService} from "../message-notifier/message-notifier.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ErrorInterceptService implements HttpInterceptor {

  constructor(private readonly messageNotifierService: MessageNotifierService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          if (error.error && error.error.title) {
            errorMessage = `Error: ${error.error.title} - ${error.statusText}`;
          }

          if(error.error && !error.error.title) {
            this.messageNotifierService.sendMessage(error.error);
          }
          if (error.error && error.error.title) {
            this.messageNotifierService.sendMessage(`Error: ${error.error.title} - ${error.statusText}`);
          }

          return throwError(error);
        })
      )
  }
}

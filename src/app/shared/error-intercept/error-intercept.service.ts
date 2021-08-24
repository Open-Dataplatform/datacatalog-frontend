import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MessageNotifierService } from '../message-notifier/message-notifier.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptService implements HttpInterceptor {
  constructor(
    private readonly messageNotifierService: MessageNotifierService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // client-side error
          this.messageNotifierService.sendMessage(`Error: ${error.error.message}`, true);
        } else if (error.error instanceof Blob) {
          // server-side error
          this.blobToText(error.error).subscribe(res => {
            this.messageNotifierService.sendMessage(res, true);
          });
        } else {
          // Unknown error
          this.messageNotifierService.sendMessage(error.error, true);
        }

        return throwError(error);
      })
    );
  }

  blobToText(blob: Blob): Observable<string> {
    return new Observable<string>((observer: any) => {

        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            const reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}
}

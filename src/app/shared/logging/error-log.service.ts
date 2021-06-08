import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {MessageNotifierService} from "../message-notifier/message-notifier.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  constructor(private readonly httpClient: HttpClient) {}

  // Segregate errors into categories.
  logError(error: any) {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    const now = new Date().toISOString();

    if (error instanceof HttpErrorResponse) {
      // this.logToELK(error, 'HTTP error');
      console.error('HTTP error', now);
      console.error(error);
    } else if (error instanceof TypeError) {
      // this.logToELK(error, 'Type Error');
      console.error('Type Error', now);
      console.error(error);
    } else if (error instanceof Error) {
      // this.logToELK(error, 'General Error');
      console.error('General Error', now);
      console.error(error);
    } else {
      // this.logToELK(error, 'Error');
      console.error('Error', now);
      console.error(error);
    }
  }
}

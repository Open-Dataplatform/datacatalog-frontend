import {ErrorHandler, Injectable} from '@angular/core';
import {ErrorLogService} from "./error-log.service";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler extends ErrorHandler {

  constructor(private errorLogService: ErrorLogService) {
    super();
  }

  // Intercepts errors, and sends them to the logservice.
  handleError(error) {
    this.errorLogService.logError(error);
    throwError(error);
  }

}

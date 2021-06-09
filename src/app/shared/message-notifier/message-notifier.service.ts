import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageNotifierService {

  messageStream$ = new Subject<IMessageObject>();

  message: string = 'what';

  constructor() {}

  getMessageStream(): Observable<IMessageObject> {
    return this.messageStream$;
  }

  sendMessage(message: string, error: boolean = false) {
    const payload: IMessageObject = {
      message: message,
      error: error
    };
    this.messageStream$.next(payload);
  }
}

export interface IMessageObject  {
  message: string,
  error: boolean
}

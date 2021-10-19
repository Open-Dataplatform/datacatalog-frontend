import { Component, OnInit } from '@angular/core';
import {IMessageObject, MessageNotifierService} from './message-notifier.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-message-notifier',
  templateUrl: './message-notifier.component.html',
  styleUrls: ['./message-notifier.component.less']
})
export class MessageNotifierComponent implements OnInit {

  message: string;
  isError: boolean;

  constructor(private readonly messageNotifierService: MessageNotifierService,
              private readonly translateService: TranslateService) { }

  ngOnInit() {
    this.messageNotifierService.getMessageStream().subscribe(message => {
      this.isError = message.error;

      if (typeof message.message === 'string') {
        console.log(message, message.message);
        this.message = message.message;
      } else {
        console.log(message);
        this.message = `${this.translateService.instant('error.occurred')} - ${this.translateService.instant('error.tryAgain')}`;
      }

      if (!message.persistMessage) {
        setTimeout(() => this.closeMessage(), 10000);
      }
    });
  }

  closeMessage() {
    this.message = '';
  }

}


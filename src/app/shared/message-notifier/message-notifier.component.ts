import { Component, OnInit } from '@angular/core';
import {MessageNotifierService} from "./message-notifier.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-message-notifier',
  templateUrl: './message-notifier.component.html',
  styleUrls: ['./message-notifier.component.less']
})
export class MessageNotifierComponent implements OnInit {

  message: string;

  constructor(private readonly messageNotifierService: MessageNotifierService,
              private readonly translateService: TranslateService) { }

  ngOnInit() {
    this.messageNotifierService.getMessageStream().subscribe(message => {
      if (typeof message.message === 'string') {
        console.log(message, message.message);
        this.message = message.message;
      } else {
        console.log(message);
        this.message = `${this.translateService.instant('error.occured')} - ${this.translateService.instant('error.tryAgain')}`;
      }
      setTimeout(() => this.closeMessage(), 10000);
    })
  }

  closeMessage() {
    // this.messageNotifierService.sendMessage('');
    this.message = '';
  }

}


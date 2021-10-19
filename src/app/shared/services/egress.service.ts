import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {PreviewDataDialogData} from '../../components/preview-data/preview-data.component';
import {TranslateService} from '@ngx-translate/core';
import {MessageNotifierService} from '../message-notifier/message-notifier.service';
import {Observable, ReplaySubject} from 'rxjs';
import {formatDate} from '@angular/common';
import {API_BASE_URL} from '../api/api';

@Injectable({providedIn: 'root'})
export class EgressService {

  constructor(private readonly messageNotifier: MessageNotifierService,
              private readonly translator: TranslateService,
              private readonly http: HttpClient,
              @Inject(API_BASE_URL) private baseUrl: string,
              @Inject(LOCALE_ID) private locale: string) {}

  public fetchAndShowPreviewData(datasetId: string, token: string, fromDate: Date, toDate: Date): Observable<PreviewDataDialogData> {
    const previewData = new ReplaySubject<PreviewDataDialogData>(1);

    const toDateString = formatDate(toDate, 'yyyy-MM-ddThh:mm', this.locale);
    const fromDateString = formatDate(fromDate, 'yyyy-MM-ddThh:mm', this.locale);
    const options = {
      headers: new HttpHeaders().set('X-Authorization', token),
      params: new HttpParams()
        .set('fromDate', fromDateString)
        .set('toDate', toDateString)
    };

    // Call egress API
    this.http.get(`${this.baseUrl}/api/egress/preview/${datasetId}`, options)
      .subscribe((result: any) => {
        if (!result || result.length === 0) {
          this.translator.get('details.side.access.preview.noData').subscribe(val => this.messageNotifier.sendMessage(val, false));
          return;
        }
        const displayedColumns = Object.keys(result[0]);
        return previewData.next(new PreviewDataDialogData(displayedColumns, result));
      }, (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.translator.get('details.side.access.preview.error.missingConfig')
            .subscribe(val => this.messageNotifier.sendMessage(`${val}. Error message:\n${error.error.message}\n CorrelationId: ${error.error.correlationId}`, true, true));
        } else if (error.status === 403) {
          this.translator.get('details.side.access.preview.error.auth')
            .subscribe(val => this.messageNotifier.sendMessage(`${val}. Error message:\n${error.error.message}\n CorrelationId: ${error.error.correlationId}`, true, true));
        } else {
          this.translator.get('details.side.access.preview.error.generic')
            .subscribe(val => this.messageNotifier.sendMessage(`${val}. Error message:\n${error.error.message}\n CorrelationId: ${error.error.correlationId}`, true));
        }
      });

    return previewData.asObservable();
  }
}

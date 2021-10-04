import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {PreviewDataDialogData} from '../../components/preview-data/preview-data.component';
import {TranslateService} from '@ngx-translate/core';
import {EGRESS_BASE_URL} from '../../app.module';
import {MessageNotifierService} from '../message-notifier/message-notifier.service';
import {Observable, ReplaySubject} from 'rxjs';
import {formatDate} from '@angular/common';

@Injectable({providedIn: 'root'})
export class EgressService {

  private LIMIT = '10';
  private http: HttpClient;

  constructor(private readonly messageNotifier: MessageNotifierService,
              private readonly translator: TranslateService,
              private readonly httpBackend: HttpBackend,
              @Inject(EGRESS_BASE_URL) private readonly egressBaseUrl: string,
              @Inject(LOCALE_ID) private locale: string) {
    this.http = new HttpClient(httpBackend);
  }

  // tslint:disable-next-line:max-line-length
  public fetchAndShowPreviewData(datasetId: string, token: string, fromDate: Date, toDate: Date): Observable<PreviewDataDialogData> {
    const previewData = new ReplaySubject<PreviewDataDialogData>(1);

    const toDateString = formatDate(toDate, 'yyyy-MM-ddThh:mm', this.locale);
    const fromDateString = formatDate(fromDate, 'yyyy-MM-ddThh:mm', this.locale);
    const options = {
      headers: new HttpHeaders().set('Authorization', token),
      params: new HttpParams()
        .set('limit', this.LIMIT)
        .set('from_date', fromDateString)
        .set('to_date', toDateString)
    };
    // Call egress API
    this.http.get(`${this.egressBaseUrl}/${datasetId}/json`, options).subscribe((result: any) => {
      if (!result || result.length === 0) {
        this.translator.get('details.side.access.preview.noData').subscribe(val => this.messageNotifier.sendMessage(val, false));
        return;
      }
      const displayedColumns = Object.keys(result[0]);
      return previewData.next(new PreviewDataDialogData(displayedColumns, result));
    }, (error: HttpErrorResponse) => {
      if (error.status === 418) {
        this.translator.get('details.side.access.preview.error.missingConfig')
          .subscribe(val => this.messageNotifier.sendMessage(`${val}. Error message:\n${error.message}`, true));
      } else {
        this.translator.get('details.side.access.preview.error.generic')
          .subscribe(val => this.messageNotifier.sendMessage(`${val}. Error message:\n${error.message}`, true));
      }
    });

    return previewData.asObservable();
  }
}

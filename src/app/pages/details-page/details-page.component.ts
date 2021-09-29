import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataHandlerService } from '../../shared/data-handler.service';
import { DataStewardHandlerService } from '../data-steward/data-steward-handler.service';
import { UserHandlerService } from '../../shared/user/user-handler.service';
import { MessageNotifierService } from '../../shared/message-notifier/message-notifier.service';
import { TranslateService } from '@ngx-translate/core';
import {
  ICategory,
  IDataset,
  IEnum
} from 'src/app/shared/api/api';
import { CategoryService } from 'src/app/shared/services/category.service';
import {PreviewDataComponent} from '../../components/preview-data/preview-data.component';
import {HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EGRESS_BASE_URL} from '../../app.module';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.less']
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  id: string;
  categories: ICategory[];
  dataSet: IDataset;
  confidentiality: IEnum;
  currentTransformationDescription = '';
  userHasDataStewardRole$ = this.userHandlerService.userHasDataStewardRole$;
  oboToken$ = this.userHandlerService.oboToken$;
  http: HttpClient;

  constructor(private readonly activeRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly dataHandlerService: DataHandlerService,
              private readonly userHandlerService: UserHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly messageNotifier: MessageNotifierService,
              private readonly categoryService: CategoryService,
              private readonly translator: TranslateService,
              private readonly httpBackend: HttpBackend,
              @Inject(EGRESS_BASE_URL) private readonly egressBaseUrl: string,
              @Inject(LOCALE_ID) public locale: string,
              private dialog: MatDialog) {
    this.http = new HttpClient(httpBackend);
              }
  ngOnDestroy(): void {
    this.userHandlerService.ClearOboToken();
  }

  ngOnInit() {
    // Subscribe to navigations
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getDetailsFromId(this.id);
      this.currentTransformationDescription = this.dataHandlerService.currentTransformation
      && this.dataHandlerService.currentTransformation.description ?
        this.dataHandlerService.currentTransformation.description : '';
    });

    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  // formats an iso date to a readable string.
  formatDateFromIsoString(date?: Date): string {
    return date?.toISOString()
      .substring(0, 10) // Get the first 10 characters.
      .split('-') // split the string with -
      .reverse() // reverse the string to reverse the dates from YYYYMMDD -> DDMMYYYY
      .join('/'); // join it back to get a readable string,
  }

  // Navigate to edit and send dataset data to
  editDataSet() {
    this.dataStewardHandlerService.setDataSet(this.dataSet);
    this.router.navigate(['/datasteward']);
  }

  deleteDataset() {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm dataset deletion',
        message: 'You are about to delete the dataset ' + this.dataSet.name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.dataHandlerService.deleteDataset(this.dataSet.id).subscribe((response) => {
          this.messageNotifier.sendMessage('Successfully deleted the dataset', false);
          this.router.navigate(['/']);
        });
      }
    });
  }

  // Get data set data from server, from id.
  getDetailsFromId(id: string): void {
    this.dataHandlerService.getDetailsFromId(id).subscribe((response) => {
      this.dataSet = response;
      this.getConfidentiality();
    });
  }

  // Get confidentiality of the dataset.
  getConfidentiality(): void {
    this.dataHandlerService.getConfidentiality().subscribe((conf) => {
      this.confidentiality = conf.filter(
        (level) => level.id === this.dataSet.confidentiality
      )[0];
    });
  }

  getOboToken(): void {
    this.userHandlerService.GetOboToken();
  }

  previewData(): void {
    this.oboToken$.subscribe(token => {
      if (token) {
        const toDate = new Date();
        let fromDate: Date = new Date();
        fromDate.setDate(fromDate.getDate() - 31);

        // If we know the frequency, we use the code to deduce the time-step we should take back in time
        if (this.dataSet.frequency) {
          fromDate = this.subtractFrequencyFromDate(this.dataSet.frequency.code, toDate);
        }
        const toDateString = formatDate(toDate, 'yyyy-MM-ddThh:mm', this.locale);
        const fromDateString = formatDate(fromDate, 'yyyy-MM-ddThh:mm', this.locale);
        const options = {
          headers: new HttpHeaders().set('Authorization', token),
          params: new HttpParams()
            .set('limit', '10')
            .set('from_date', fromDateString)
            .set('to_date', toDateString)
        };
        // Call egress API
        this.http.get(`${this.egressBaseUrl}/${this.dataSet.id}/json`, options).subscribe((result: any) => {
          if (!result || result.length === 0) {
            this.translator.get('details.side.access.preview.noData').subscribe(val => this.messageNotifier.sendMessage(val, false));
            return;
          }
          const displayedColumns = Object.keys(result[0]);
          this.dialog.open(PreviewDataComponent, {
            data: {
              displayedColumns: displayedColumns,
              rows: result
            }
          });
        }, (error: HttpErrorResponse) => {
          if (error.status === 418) {
            this.translator.get('details.side.access.preview.error.missingConfig')
              .subscribe(val => this.messageNotifier.sendMessage(`${val}. Error message:\n${error.message}`, true));
          } else {
            this.translator.get('details.side.access.preview.error.generic')
              .subscribe(val => this.messageNotifier.sendMessage(`${val}. Error message:\n${error.message}`, true));
          }
        });
      } else {
        this.translator.get('details.side.access.preview.missingToken').subscribe(val => this.messageNotifier.sendMessage(val, true));
      }
    });
  }

  copyToClipBoard(): void {
    this.oboToken$.subscribe(token => {
      navigator.clipboard.writeText(token).then(_ =>
        this.translator.get('details.side.access.token.success').subscribe(val => this.messageNotifier.sendMessage(val, false)));
    });
  }

  public subtractFrequencyFromDate(frequencyCode: string, date: Date): Date {
    let minutesToSubtract = 0;
    let hoursToSubtract = 0;
    let daysToSubtract = 0;
    let monthsToSubtract = 0;
    let yearsToSubtract = 0;

    switch (frequencyCode) {
      case 'PT1M':
        minutesToSubtract = 1;
        break;
      case 'PT3M':
        minutesToSubtract = 3;
        break;
      case 'PT5M':
        minutesToSubtract = 5;
        break;
      case 'PT15M':
        minutesToSubtract = 15;
        break;
      case 'PT1H':
        hoursToSubtract = 1;
        break;
      case 'PT6H':
        hoursToSubtract = 6;
        break;
      case 'PT12H':
        hoursToSubtract = 12;
        break;
      case 'P1D':
        daysToSubtract = 1;
        break;
      case 'P7D':
        daysToSubtract = 7;
        break;
      case 'P1M':
        monthsToSubtract = 1;
        break;
      case 'P1Y':
        yearsToSubtract = 1;
        break;
    }
    return new Date(
      date.getFullYear() - yearsToSubtract,
      date.getMonth() - monthsToSubtract,
      date.getDate() - daysToSubtract,
      date.getHours() - hoursToSubtract,
      date.getMinutes() - minutesToSubtract,
      date.getSeconds(),
      date.getMilliseconds()
    );
  }

}

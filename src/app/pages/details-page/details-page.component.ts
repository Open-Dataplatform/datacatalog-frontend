import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataHandlerService } from '../../shared/data-handler.service';
import { DataStewardHandlerService } from '../data-steward/data-steward-handler.service';
import { UserHandlerService } from '../../shared/user/user-handler.service';
import { MessageNotifierService } from '../../shared/message-notifier/message-notifier.service';
import { TranslateService } from '@ngx-translate/core';
import {
  Duration,
  ICategory,
  IDataset,
  IEnum
} from 'src/app/shared/api/api';
import { CategoryService } from 'src/app/shared/services/category.service';
import { GetDatasetStatusName } from 'src/app/shared/constants';
import { EgressService } from '../../shared/services/egress.service';
import {PreviewDataComponent} from '../../components/preview-data/preview-data.component';
import {Subscription} from 'rxjs';
import {FrontendMetricsService} from '../../shared/services/frontendMetrics.service';

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
  userHasDataStewardRole$ = this.userHandlerService.userHasDataStewardRole$;
  oboToken$ = this.userHandlerService.oboToken$;
  currentTransformation$ = this.dataHandlerService.currentTransformation$;
  previewDataSubscription: Subscription;

  constructor(private readonly activeRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly dataHandlerService: DataHandlerService,
              private readonly userHandlerService: UserHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly messageNotifier: MessageNotifierService,
              private readonly categoryService: CategoryService,
              private readonly translator: TranslateService,
              private readonly egressService: EgressService,
              private readonly frontendMetricsService: FrontendMetricsService,
              private dialog: MatDialog) {
              }

  ngOnDestroy(): void {
    this.previewDataSubscription?.unsubscribe();
    this.userHandlerService.ClearOboToken();
  }

  ngOnInit() {
    // Subscribe to navigations
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getDetailsFromId(this.id);
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
    this.frontendMetricsService.oboFlowInitiated();
    this.userHandlerService.GetOboToken();
  }

  previewData(): void {
    this.previewDataSubscription = this.oboToken$.subscribe(token => {
      if (token) {
        const toDate = new Date();
        let fromDate: Date = new Date();
        fromDate.setDate(fromDate.getDate() - 31);

        // If we know the frequency, we use the code to deduce the time-step we should take back in time
        if (this.dataSet.frequency) {
          fromDate = this.subtractFrequencyFromDate(this.dataSet.frequency, toDate);
        }
        this.egressService.fetchAndShowPreviewData(this.dataSet.id, token, fromDate, toDate)
          .subscribe(previewDataDialogData => {
            const dialogWindow = this.dialog.open(PreviewDataComponent, {
              data: previewDataDialogData
            }).afterClosed();
            dialogWindow.subscribe(_ => this.previewDataSubscription?.unsubscribe());
          });
      } else {
        this.userHandlerService.GetOboToken();
      }
    });
  }

  copyToClipBoard(): void {
    this.oboToken$.subscribe(token => {
      navigator.clipboard.writeText(token).then(_ =>
        this.translator.get('details.side.access.token.success').subscribe(val => this.messageNotifier.sendMessage(val, false)));
    });
  }

  GetDatasetStatusName(): string {
    return GetDatasetStatusName(this.dataSet.status);
  }

  private subtractFrequencyFromDate(frequency: Duration, date: Date): Date {
    const minutesToSubtract = frequency.durationInMinutes;
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes() - minutesToSubtract,
      date.getSeconds(),
      date.getMilliseconds()
    );
  }

}

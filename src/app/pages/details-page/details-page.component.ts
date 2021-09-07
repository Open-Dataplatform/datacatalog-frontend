import { Component, OnDestroy, OnInit } from '@angular/core';
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


  constructor(private readonly activeRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly dataHandlerService: DataHandlerService,
              private readonly userHandlerService: UserHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly messageNotifier: MessageNotifierService,
              private readonly categoryService: CategoryService,
              private readonly translator: TranslateService,
              private dialog: MatDialog) {
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

  copyToClipBoard(): void {
    this.oboToken$.subscribe(token => {
      navigator.clipboard.writeText(token).then(_ =>
        this.translator.get('details.side.access.token.success').subscribe(val => this.messageNotifier.sendMessage(val, false)));
    });
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataHandlerService } from '../../shared/data-handler.service';
import { DataStewardHandlerService } from '../data-steward/data-steward-handler.service';
import { UserHandlerService } from '../../shared/user/user-handler.service';
import { UserManager } from 'oidc-client';
import { environment } from '../../../environments/environment';
import {MessageNotifierService} from '../../shared/message-notifier/message-notifier.service';
import {TranslateService} from '@ngx-translate/core';
import {
  DatasetSummary,
  ICategory,
  IDataset,
  IEnum,
  Transformation,
} from 'src/app/shared/api/api';
import { OBO_USER_MANAGER_TOKEN } from 'src/app/app.module';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.less']
})
export class DetailsPageComponent implements OnInit {
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
              private readonly translator: TranslateService) {
              }

  ngOnInit() {
    // Subscribe to navigations
    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getDetailsFromId(this.id);
      this.currentTransformationDescription = this.dataHandlerService.currentTransformation && this.dataHandlerService.currentTransformation.description ?
        this.dataHandlerService.currentTransformation.description : '';
    });
    this.categories = this.dataHandlerService.categories;
  }

  // formats an iso date to a readable string.
  formatDateFromIsoString(date?: Date): string {
    return date?.toISOString()
      .substring(0, 10) // Get the first 10 characters.
      .split('-') // split the string with -
      .reverse() // reverse the string to reverse the dates from YYYYMMDD -> DDMMYYYY
      .join('/'); // join it back to get a readable string,
  }

  toggleFavorites() {
    this.dataHandlerService
      .getDetailsFromId('1')
      .subscribe((res) => console.log('res', res));
    // if (this.isFavorite()) {
    //   this.dataHandlerService.removeFromFavorites(this.id).subscribe(fav => {
    //     this.getFavorites();
    //   });
    // } else {
    //   this.dataHandlerService.addToFavorites(this.id).subscribe(fav => {
    //     this.getFavorites();
    //   });
    // }
  }

  getFavorites() {
    // this.dataHandlerService.getFavorites().subscribe(favorites => {
    // this.dataHandlerService.favorites = favorites;
    // });
  }

  // Navigate to edit and send dataset data to
  editDataSet() {
    this.dataStewardHandlerService.setDataSet(this.dataSet);
    this.router.navigate(['/datasteward']);
  }

  promoteDatasetToStock() {
    this.dataSet.sourceTransformation = new Transformation ({
      id: '',
      sourceDatasets: [],
      createdDate: new Date(),
      modifiedDate: new Date()
    });

    this.dataSet.sourceTransformation.sourceDatasets.push(
      new DatasetSummary({
        name: this.dataSet.name,
        description: this.dataSet.description,
        status: this.dataSet.status,
        confidentiality: this.dataSet.confidentiality,
        categories: this.dataSet.categories,
        id: this.dataSet.id,
        createdDate: this.dataSet.createdDate,
        modifiedDate: this.dataSet.modifiedDate,
      })
    );

    const promotedDatasetName = 'promoted_' + this.dataSet.name;
    const currentLocation = this.dataSet.name
      .toLocaleLowerCase()
      .replace(' ', '-');

    const newLocation = promotedDatasetName
      .toLocaleLowerCase()
      .replace(' ', '-');

    this.dataSet.datasetChangeLogs = [];
    this.dataSet.version = 0;
    this.dataSet.refinementLevel = 1; // Promote to stock
    this.dataSet.location = this.dataSet.location.replace(
      currentLocation,
      newLocation
    );

    this.dataSet.dataFields.forEach((datafield) => (datafield.id = null));
    this.dataSet.name = promotedDatasetName;
    this.dataSet.id = null;

    this.dataStewardHandlerService.setDataSet(this.dataSet);
    this.router.navigate(['/datasteward']);
  }

  isFavorite(): boolean {
    // if (this.dataHandlerService && this.dataHandlerService.favorites) {
    //   return this.dataHandlerService.favorites.some(fav => fav.id === this.dataCard.id);
    // }

    return false;
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

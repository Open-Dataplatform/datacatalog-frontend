import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataHandlerService} from '../../shared/data-handler.service';
import { Components } from '../../../types/dataplatform-api';
import ICategory = Components.Schemas.ICategory;
import IDataset = Components.Schemas.IDataset;
import { IConfidentialityEnum } from '../../../types/dataplatform-enum';
import {DataStewardHandlerService} from '../data-steward/data-steward-handler.service';
import {UserHandlerService} from '../../shared/user/user-handler.service';
import { UserManager } from 'oidc-client';
import { environment } from '../../../environments/environment';
import {MessageNotifierService} from '../../shared/message-notifier/message-notifier.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.less']
})
export class DetailsPageComponent implements OnInit {

  id: string;
  categories: ICategory[];
  dataSet: IDataset;
  showGtmsDataAccessDescription = false;
  showNeptunDataAccessDescription = false;
  confidentiality: IConfidentialityEnum;
  currentTransformationDescription = '';
  userHasDataStewardRole$ = this.userHandlerService.userHasDataStewardRole$;
  oboUserManager: UserManager;

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
    this.oboUserManager = new UserManager(environment.oboOidcSettings);
  }

  // formats an iso date to a readable string.
  formatDateFromIsoString(isoString: string): string {
    return isoString.substring(0, 10) // Get the first 10 characters.
      .split('-') // split the string with -
      .reverse() // reverse the string to reverse the dates from YYYYMMDD -> DDMMYYYY
      .join('/'); // join it back to get a readable string,
  }

  toggleFavorites() {
    this.dataHandlerService.getDetailsFromId('1').subscribe(res => console.log('res', res));
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
    this.dataSet.sourceTransformation = { sourceDatasets: []};
    this.dataSet.sourceTransformation.sourceDatasets.push(
      {
        name: this.dataSet.name,
        description: this.dataSet.description,
        status: this.dataSet.status,
        confidentiality: this.dataSet.confidentiality,
        categories: this.dataSet.categories,
        id: this.dataSet.id,
        createdDate: this.dataSet.createdDate,
        modifiedDate: this.dataSet.modifiedDate
      });

      const promotedDatasetName = 'promoted_' + this.dataSet.name;
      const currentLocation = this.dataSet.name.toLocaleLowerCase().replace(' ', '-');
      const newLocation = promotedDatasetName.toLocaleLowerCase().replace(' ', '-');
      this.dataSet.datasetChangeLogs = [];
      this.dataSet.version = 0;
      this.dataSet.refinementLevel = 1; // Promote to stock
      this.dataSet.location = this.dataSet.location.replace(currentLocation, newLocation);
      this.dataSet.dataFields.forEach(datafield => datafield.id = null);
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
    this.dataHandlerService.getDetailsFromId(id).subscribe(response => {
      this.dataSet = response;

      if (this.dataSet.categories && this.dataSet.name) {
            this.showGtmsDataAccessDescription =
              this.dataSet.categories.some(cat => cat.name == 'Gas') &&
              this.dataSet.name.startsWith('GT');
      }

      if (this.dataSet.categories && this.dataSet.name) {
            this.showNeptunDataAccessDescription =
              this.dataSet.categories.some(cat => cat.name == 'Gas') &&
              this.dataSet.name.startsWith('Neptun');
      }
      this.getConfidentiality();
    });
  }

  // Get confidentiality of the dataset.
  getConfidentiality(): void {
    this.dataHandlerService.getConfidentiality().subscribe(conf => {
       this.confidentiality = conf.filter(level => level.id === this.dataSet.confidentiality)[0];
    });
  }

  GetOboToken(): void {
    this.oboUserManager.signinPopup().then(user => {
      navigator.clipboard.writeText(user.access_token).then(_ =>
        this.translator.get('details.side.access.token.success').toPromise().then(val => this.messageNotifier.sendMessage(val)));
    });
  }

}

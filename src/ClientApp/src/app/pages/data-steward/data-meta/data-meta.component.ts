import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataHandlerService} from "../../../shared/data-handler.service";
import {Observable} from "rxjs";
import {DataStewardHandlerService, IMetaDataInfo} from "../data-steward-handler.service";
import { Components } from '../../../../types/dataplatform-api'
import ICategory = Components.Schemas.ICategory;
import IDataset = Components.Schemas.IDataset;
import {Router} from "@angular/router";

@Component({
  selector: 'app-data-meta',
  templateUrl: './data-meta.component.html',
  styleUrls: ['./data-meta.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class DataMetaComponent implements OnInit {

  data: IDataset;
  today: Date;

  categories$: Observable<ICategory[]>;
  dataset$: Observable<IDataset[]>;

  constructor(private readonly dataHandlerService: DataHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly router: Router) {
    this.today = new Date();
  }

  ngOnInit() {
    this.categories$ = this.dataHandlerService.getCategoryData(true);
    this.dataset$ = this.dataHandlerService.getDataSets('');

    this.data = this.dataStewardHandlerService.getDataSet();
  }

  // get metadata version or initiate a version 1.
  get metadataVersion(): IMetaDataInfo {
    if (this.data && this.data.version) {
      return {version: this.data.version, changeDate: this.formatTime(this.data.modifiedDate)};
    }
    return {version: 1, changeDate: this.formatTime(this.today.toISOString())};
  };

  // Expects an ISO date and formats it.
  formatTime(time: string) {
    const timer = time.split('T')
      .reverse()
      .shift()
      .split('.')
      .shift();

    const date = time.split('T')
      .shift()
      .split('-')
      .reverse()
      .join('/');

    return date + ' - ' + timer;
  }

  nextPage() {
    this.router.navigate(['/datasteward/dataabout']);
  }

  // update data on service when changed.
  onDataChange() {
    this.dataStewardHandlerService.setDataSet(this.data);
  }



}

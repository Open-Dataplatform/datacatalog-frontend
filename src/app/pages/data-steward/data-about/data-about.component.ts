import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from "../../../shared/data-handler.service";
import {Observable} from "rxjs";
import {DataStewardHandlerService} from "../data-steward-handler.service";
import { Components } from '../../../../types/dataplatform-api'
import IDataset = Components.Schemas.IDataset;
import {IConfidentialityEnum} from "../../../../types/dataplatform-enum";
import IDuration = Components.Schemas.IDuration;
import {Router} from "@angular/router";

@Component({
  selector: 'app-data-about',
  templateUrl: './data-about.component.html',
  styleUrls: ['./data-about.component.less']
})
export class DataAboutComponent implements OnInit {

  data: IDataset;

  contacts$: Observable<any>;
  confidentiality$: Observable<IConfidentialityEnum[]>;
  durations$: Observable<IDuration[]>;

  currentDate: string;

  saving: boolean;

  constructor(private readonly dataHandlerService: DataHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly router: Router) { }

  ngOnInit() {
    this.contacts$ = this.dataHandlerService.getMemberGroups();
    this.confidentiality$ = this.dataHandlerService.getConfidentiality();
    this.durations$ = this.dataHandlerService.getDurations();

    this.currentDate = this.dataStewardHandlerService.currentDate;
    this.data = this.dataStewardHandlerService.getDataSet();
  }

  onChange() {
    this.dataStewardHandlerService.setDataSet(this.data);
  }

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

  isDataExisting() {
    return Object.keys(this.data).length;
  }

  // Publish the data set to the server, and navigate to the details page of it.
  publishDataSet() {
    if (this.isDataExisting()) {
      this.saving = true;
      this.dataStewardHandlerService.publishDataSet()
          .subscribe(resp => {
            this.saving = false;
            this.router.navigate(['/detail', resp.id]);
          },error => {
            this.saving = false;
          });
    }

  }

}

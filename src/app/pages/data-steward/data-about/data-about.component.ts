import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../../shared/data-handler.service';
import {Observable} from 'rxjs';
import {DataStewardHandlerService} from '../data-steward-handler.service';
import {Router} from '@angular/router';
import { IDataset, IDuration, IEnum } from 'src/app/shared/api/api';

@Component({
  selector: 'app-data-about',
  templateUrl: './data-about.component.html',
  styleUrls: ['./data-about.component.less']
})
export class DataAboutComponent implements OnInit {

  data: IDataset;

  confidentiality$: Observable<IEnum[]>;
  durations$: Observable<IDuration[]>;

  currentDate: string;

  saving: boolean;

  constructor(private readonly dataHandlerService: DataHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly router: Router) { }

  ngOnInit() {
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
          }, error => {
            this.saving = false;
          });
    }

  }

}

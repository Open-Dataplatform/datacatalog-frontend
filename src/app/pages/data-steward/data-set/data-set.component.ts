import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from "../../../shared/data-handler.service";
import {DataStewardHandlerService} from "../data-steward-handler.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import { IDataset, IDataSource, IEnum } from 'src/app/shared/api/api';

@Component({
  selector: 'app-data-set',
  templateUrl: './data-set.component.html',
  styleUrls: ['./data-set.component.less']
})
export class DataSetComponent implements OnInit {

  data: IDataset;
  status$: Observable<IEnum[]>;
  dataSource$: Observable<IDataSource[]>;

  constructor(private readonly dataHandlerService: DataHandlerService,
              private readonly dataStewardHandlerService: DataStewardHandlerService,
              private readonly router: Router) { }

  ngOnInit() {
    this.data = this.dataStewardHandlerService.getDataSet();
    this.data.status = 0;

    this.status$ = this.dataHandlerService.getDataSetStatus();
    this.dataSource$ = this.dataHandlerService.getDataSources();
  }

  // update data on service when changed.
  onDataChange() {
    this.dataStewardHandlerService.setDataSet(this.data);
  }

  nextPage() {
    this.router.navigate(['/datasteward/datameta']);
  }
}

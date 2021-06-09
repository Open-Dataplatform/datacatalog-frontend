import { Injectable } from '@angular/core';
import {DataHandlerService} from "../../shared/data-handler.service";
import { Components } from '../../../types/dataplatform-api'
import IDataset = Components.Schemas.IDataset;
import {Observable} from "rxjs";

/*
This is a shared data handler service for the data steward pages,
this collects and holds the data on the data steward pages.
 */

@Injectable({
  providedIn: 'root'
})
export class DataStewardHandlerService {

  dataSet: IDataset;

  constructor(private readonly dataHandlerService: DataHandlerService) { }

  get currentDate(): string {
    const today = new Date();
    return today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
  }

  ngOnInit () {
    this.dataSet = this.getDataSet();
  }

  getDataSet(): IDataset {
    if (this.dataSet) {
      return this.dataSet;
    }
    return {};
  }

  setDataSet(data: IDataset) {
    this.dataSet = data;
  }

  publishDataSet(): Observable<IDataset> {
    if (this.dataSet && this.dataSet.id) {
      return this.dataHandlerService.updateDataSet(this.dataSet);
    } else {
      return this.dataHandlerService.createNewDataSet(this.dataSet);
    }
  }
}

export interface IMetaDataInfo {
  version: number;
  changeDate: string;
}

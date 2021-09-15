import { Injectable } from '@angular/core';
import {DataHandlerService} from "../../shared/data-handler.service";
import {Observable} from "rxjs";
import { DataFieldType, DataFieldUnit, DataFieldUpsertRequest, Dataset, DatasetUpdateRequest, IDataset } from 'src/app/shared/api/api';
import { EMPTY_GUID } from 'src/app/shared/constants';

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
    return new Dataset();
  }

  setDataSet(data: IDataset) {
    this.dataSet = data;
  }

  publishDataSet(): Observable<IDataset> {
    // Convert Dataset to DatasetUpdateRequest.
    //To do this we need to convert DataFields to DataFieldUpsertRequests which again requires converting type and unit from strings to enums
    const updateRequest = new DatasetUpdateRequest({
      ...this.dataSet,
      dataFields: this.dataSet.dataFields
        ?.map(df => new DataFieldUpsertRequest({
          ...df,
          type: DataFieldType[df.type],
          unit: DataFieldUnit[df.unit]
        }))
    });
    
    if (updateRequest.id && updateRequest.id !== EMPTY_GUID) {
      return this.dataHandlerService.updateDataSet(updateRequest);
    } else {
      return this.dataHandlerService.createNewDataSet(updateRequest);
    }
  }
}

export interface IMetaDataInfo {
  version: number;
  changeDate: string;
}

import { TestBed, waitForAsync } from '@angular/core/testing';

import { DataHandlerService } from './data-handler.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {EMPTY, Observable} from "rxjs";
import { Components } from '../../types/dataplatform-api'
import IDataset = Components.Schemas.IDataset;
import {UserHandlerService} from "./user/user-handler.service";
import { SharedModule } from './shared.module';

describe('DataHandlerService', () => {

  let service: DataHandlerService;
  let userService: UserHandlerService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      TranslateModule.forRoot(),
      SharedModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(DataHandlerService);
    userService = TestBed.get(UserHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createNewDataSet() should return empty if no dataset is provided', waitForAsync((done) => {
    const newDataSet$ = service.createNewDataSet(undefined);
    expect(newDataSet$).toBe(EMPTY);
  }));

  it('updateDataSet() should return empty if no dataset is provided', waitForAsync((done) => {
    const updatedDataSet$ = service.updateDataSet(undefined);
    expect(updatedDataSet$).toBe(EMPTY);
  }));
});

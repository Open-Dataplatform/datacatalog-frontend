import { TestBed } from '@angular/core/testing';

import { DataStewardHandlerService } from './data-steward-handler.service';
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { UserHandlerService } from '../../shared/user/user-handler.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('DataStewardHandlerService', () => {
  
  beforeEach(async () => TestBed.configureTestingModule({
    imports: [
      TranslateModule.forRoot(),
      HttpClientTestingModule,
      SharedModule
    ]
  }).compileComponents());

  it('should be created', () => {
    const service: DataStewardHandlerService = TestBed.get(DataStewardHandlerService);
    expect(service).toBeTruthy();
  });
});

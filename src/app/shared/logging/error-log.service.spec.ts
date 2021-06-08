import { TestBed } from '@angular/core/testing';

import { ErrorLogService } from './error-log.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ErrorLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: ErrorLogService = TestBed.get(ErrorLogService);
    expect(service).toBeTruthy();
  });
});

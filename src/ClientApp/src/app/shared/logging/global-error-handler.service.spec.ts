import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandler } from './global-error-handler.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GlobalErrorHandler', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: GlobalErrorHandler = TestBed.get(GlobalErrorHandler);
    expect(service).toBeTruthy();
  });
});

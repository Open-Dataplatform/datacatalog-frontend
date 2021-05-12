import { TestBed } from '@angular/core/testing';

import { MessageNotifierService } from './message-notifier.service';

describe('MessageNotifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageNotifierService = TestBed.get(MessageNotifierService);
    expect(service).toBeTruthy();
  });
});

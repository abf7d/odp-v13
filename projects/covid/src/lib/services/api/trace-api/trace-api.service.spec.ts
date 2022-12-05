import {TestBed} from '@angular/core/testing';

import {TraceApiService} from './trace-api.service';

describe('TraceApiService', () => {
  let service: TraceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

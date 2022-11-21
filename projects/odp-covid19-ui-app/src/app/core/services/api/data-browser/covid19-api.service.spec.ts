import {TestBed} from '@angular/core/testing';

import {Covid19ApiService} from './covid19-api.service';

describe('Covid19ApiService', () => {
  let service: Covid19ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Covid19ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

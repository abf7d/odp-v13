import {TestBed} from '@angular/core/testing';

import {VariantApiService} from './variant-api.service';

describe('OdpApiService', () => {
  let service: VariantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

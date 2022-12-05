import {TestBed} from '@angular/core/testing';

import {VariantMapperService} from './variant-mapper.service';

describe('VariantMapperService', () => {
  let service: VariantMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LineageApiService } from './lineage-api.service';

describe('LineageApiService', () => {
  let service: LineageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

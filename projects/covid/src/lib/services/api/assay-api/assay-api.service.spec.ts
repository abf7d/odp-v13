import { TestBed } from '@angular/core/testing';

import { AssayApiService } from './assay-api.service';

describe('AssayApiService', () => {
  let service: AssayApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssayApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

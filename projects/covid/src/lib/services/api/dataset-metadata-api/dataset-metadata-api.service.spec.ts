import { TestBed } from '@angular/core/testing';

import { DatasetMetadataApiService } from './dataset-metadata-api.service';

describe('DatasetMetadataApiService', () => {
  let service: DatasetMetadataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasetMetadataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

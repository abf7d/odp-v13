import { TestBed } from '@angular/core/testing';

import { ActivityPointApiService } from './activity-point-api.service';

describe('ActivityPointApiService', () => {
  let service: ActivityPointApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityPointApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

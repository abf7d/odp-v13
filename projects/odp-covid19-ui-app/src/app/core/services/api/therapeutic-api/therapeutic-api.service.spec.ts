import { TestBed } from '@angular/core/testing';

import { TherapeuticApiService } from './therapeutic-api.service';

describe('TherapeuticApiService', () => {
  let service: TherapeuticApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TherapeuticApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

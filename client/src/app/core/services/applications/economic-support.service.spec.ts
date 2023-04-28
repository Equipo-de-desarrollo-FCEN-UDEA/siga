import { TestBed } from '@angular/core/testing';

import { EconomicSupportService } from './economic-support.service';

describe('EconomicSupportService', () => {
  let service: EconomicSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EconomicSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

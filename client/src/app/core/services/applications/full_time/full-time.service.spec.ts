import { TestBed } from '@angular/core/testing';

import { FullTimeService } from './full-time.service';

describe('FullTimeService', () => {
  let service: FullTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ReportFullTimeService } from './report-full-time.service';

describe('ReportFullTimeService', () => {
  let service: ReportFullTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportFullTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApplicationStatusService } from './application-status.service';

describe('ApplicationStatusService', () => {
  let service: ApplicationStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

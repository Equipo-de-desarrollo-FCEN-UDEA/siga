import { TestBed } from '@angular/core/testing';

import { FormsStatusService } from './forms-status.service';

describe('FormsStatusService', () => {
  let service: FormsStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

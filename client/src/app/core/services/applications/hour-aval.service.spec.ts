import { TestBed } from '@angular/core/testing';

import { HourAvalService } from './hour-aval.service';

describe('HourAvalService', () => {
  let service: HourAvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HourAvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

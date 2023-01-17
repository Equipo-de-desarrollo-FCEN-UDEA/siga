import { TestBed } from '@angular/core/testing';

import { ComService } from './com.service';

describe('ComService', () => {
  let service: ComService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

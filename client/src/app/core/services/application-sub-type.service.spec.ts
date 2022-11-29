import { TestBed } from '@angular/core/testing';

import { ApplicationSubTypeService } from './application-sub-type.service';

describe('ApplicationSubTypeService', () => {
  let service: ApplicationSubTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationSubTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

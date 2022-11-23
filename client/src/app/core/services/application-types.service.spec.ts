import { TestBed } from '@angular/core/testing';

import { ApplicationTypesService } from './application-types.service';

describe('ApplicationTypesService', () => {
  let service: ApplicationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserRolService } from './userrol.service';

describe('UserrolService', () => {
  let service: UserRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

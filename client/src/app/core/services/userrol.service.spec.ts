import { TestBed } from '@angular/core/testing';

import { UserrolService } from './userrol.service';

describe('UserrolService', () => {
  let service: UserrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

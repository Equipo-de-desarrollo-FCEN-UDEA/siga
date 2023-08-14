import { TestBed } from '@angular/core/testing';

import { RolSelectionGuard } from './rol-selection.guard';

describe('RolSelectionGuard', () => {
  let guard: RolSelectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolSelectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

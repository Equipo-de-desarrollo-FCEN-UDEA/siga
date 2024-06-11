import { TestBed } from '@angular/core/testing';

import { EditViewGuard } from './edit-view.guard';

describe('EditViewGuard', () => {
  let guard: EditViewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditViewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

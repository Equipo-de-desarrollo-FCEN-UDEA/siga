import { TestBed } from '@angular/core/testing';

import { SuperempleadoGuard } from './superempleado.guard';

describe('SuperempleadoGuard', () => {
  let guard: SuperempleadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SuperempleadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

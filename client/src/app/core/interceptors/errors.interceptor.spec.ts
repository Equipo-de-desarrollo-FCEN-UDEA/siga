import { TestBed } from '@angular/core/testing';

import { ErrorsInterceptor } from './errors.interceptor';

describe('ErrorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorsInterceptor = TestBed.inject(ErrorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

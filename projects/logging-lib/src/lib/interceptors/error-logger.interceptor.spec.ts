import { TestBed } from '@angular/core/testing';

import { ErrorLoggerInterceptor } from './error-logger.interceptor';

describe('ErrorLoggerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorLoggerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorLoggerInterceptor = TestBed.inject(ErrorLoggerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

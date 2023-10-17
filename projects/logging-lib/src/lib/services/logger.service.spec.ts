import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { LoggerConfig } from '../interfaces/loggerConfig.interface';
import { ERROR_LOGGER_CONFIG_TOKEN } from '../config';
import { LoggingLibModule } from '../logging-lib.module';

describe('LoggerService', () => {
  let service: LoggerService;
  const mockConfig: LoggerConfig = {
    cleanInterval: 1000, // Example clean interval
    logFormat: 'Test Log -',
    logTarget: ['console'],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoggingLibModule],
      providers: [
        LoggerService,
        {
          provide: ERROR_LOGGER_CONFIG_TOKEN,
          useValue: mockConfig,
        },
      ],
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clean log queue after the specified interval', (done: DoneFn) => {
    const spy = spyOn(console, 'error');
    const error = new Error('Test Error');
    service.logError(error);

    setTimeout(() => {
      expect(service.logQ.length).toBe(0);
      expect(spy).toHaveBeenCalled();
      done();
    }, mockConfig.cleanInterval + 100); // Add a buffer to ensure cleaning has occurred
  });
});

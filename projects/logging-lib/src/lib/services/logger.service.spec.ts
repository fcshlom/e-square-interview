import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { LoggerConfig } from '../interfaces/loggerConfig.interface';

describe('LoggerService', () => {
  let service: LoggerService;
  const mockConfig: LoggerConfig = {
    cleanInterval: 1000, // Example clean interval
    logFormat: 'ERROR',
    logTarget: ['console', 'localStorage'],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log error', () => {
    const error = {
      message: 'Test error message',
      stack: 'Test error stack',
    };

    spyOn(console, 'error');

    service.getConfig(mockConfig);
    service.logError(error);

    expect(service.logQ.length).toBe(1);
    expect(service.logQ[0].errorMessage).toBe(error.message);
    expect(console.error).toHaveBeenCalledWith(
      `${mockConfig.logFormat} - ${error.message} - ${
        error.stack
      } - ${jasmine.any(String)}`
    );
  });

  it('should clean logger queue and log errors to console and localStorage', () => {
    const error = {
      message: 'Test error message',
      stack: 'Test error stack',
    };

    spyOn(console, 'error');
    spyOn(localStorage, 'setItem');

    service.getConfig(mockConfig);
    service.logError(error);

    expect(service.logQ.length).toBe(1);

    service['cleanLoggerQ']();

    expect(service.logQ.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(
      `${mockConfig.logFormat} - ${error.message} - ${
        error.stack
      } - ${jasmine.any(String)}`
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'ErrorLogs',
      JSON.stringify([
        {
          errorMessage: error.message,
          stack: error.stack,
          time: jasmine.any(String),
        },
      ])
    );
  });
});

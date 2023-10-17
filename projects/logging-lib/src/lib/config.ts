import { InjectionToken } from '@angular/core';
import { LoggerConfig } from './interfaces/loggerConfig.interface';

export const ERROR_LOGGER_CONFIG_TOKEN = new InjectionToken<LoggerConfig>(
  'loggerConfig'
);

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoggerService } from 'projects/logging-lib/src/lib/services/logger.service';
// import loggerConfig from '../../logger.config';
import { LoggerConfig } from 'projects/logging-lib/src/lib/interfaces/loggerConfig.interface';
import { HttpClientModule } from '@angular/common/http';
import { LoggingLibModule } from 'projects/logging-lib/src/public-api';
import { ERROR_LOGGER_CONFIG_TOKEN } from 'projects/logging-lib/src/lib/config';
import { environment } from '../environments/environment';

export const APP_CONFIG_PROD: LoggerConfig = {
  logFormat: 'Error occurred',
  logTarget: ['console', 'localStorage'],
  cleanInterval: 5000,
};

export const APP_CONFIG: LoggerConfig = {
  logFormat: 'Error occurred',
  logTarget: [],
  cleanInterval: 5000,
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, LoggingLibModule],
  providers: [
    {
      provide: ERROR_LOGGER_CONFIG_TOKEN,
      useValue: environment.production ? APP_CONFIG_PROD : APP_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

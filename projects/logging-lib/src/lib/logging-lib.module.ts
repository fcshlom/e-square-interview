import { ErrorHandler, NgModule } from '@angular/core';
import { LoggingLibComponent } from './logging-lib.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorLoggerInterceptor } from './interceptors/error-logger.interceptor';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  declarations: [LoggingLibComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorLoggerInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  imports: [HttpClientModule],
  exports: [LoggingLibComponent],
})
export class LoggingLibModule {}

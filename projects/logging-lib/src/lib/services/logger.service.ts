import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { LoggerConfig } from '../interfaces/loggerConfig.interface';
import { LogData } from '../interfaces/logData.interface';
import { ERROR_LOGGER_CONFIG_TOKEN } from '../config';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logQ: LogData[] = [];
  logQSubj: BehaviorSubject<LogData[]> = new BehaviorSubject<LogData[]>([]);

  public constructor(
    @Inject(ERROR_LOGGER_CONFIG_TOKEN) private config: LoggerConfig
  ) {
    this.getConfig(config);
    this.autoCleaner();
  }

  logError(error: any) {
    const loggerData: LogData = {
      errorMessage: error.message,
      stack: error.stack,
      time: new Date().toISOString(),
    };
    this.logQ.push(loggerData);
    this.logQSubj.next(this.logQ);
  }

  private getConfig(conf: LoggerConfig) {
    this.config = conf;
  }

  private autoCleaner(): void {
    interval(this.config.cleanInterval).subscribe(() => {
      this.cleanLoggerQ();
    });
  }

  private cleanLoggerQ() {
    if (this.logQ.length > 0) {
      const logs = [...this.logQ];

      if (this.config.logTarget.includes('console')) {
        logs.forEach((l) => console.error(this.formatter(l)));
      }

      if (this.config.logTarget.includes('localStorage')) {
        const oldLogs = JSON.parse(localStorage.getItem('errorsLogs') || '[]');
        localStorage.setItem(
          'ErrorLogs',
          JSON.stringify([...logs, ...oldLogs])
        );
      }
    }
    this.logQ = [];
    this.logQSubj.next(this.logQ);
  }

  private formatter(l: LogData) {
    return `${this.config.logFormat} - ${l.errorMessage} - ${l.stack} - ${l.time}`;
  }
}

export interface LoggerConfig {
  logFormat: string;
  logTarget: ('console' | 'localStorage')[];
  cleanInterval: number;
}

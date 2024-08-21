import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  debug(message: any, ...optionalParams: any[]): any {
    super.debug(`${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    super.error(`${message}`, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    super.log(`${message}`, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    super.verbose(`${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    super.warn(`${message}`, ...optionalParams);
  }
}

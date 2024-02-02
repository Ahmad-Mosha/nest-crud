import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly formattingMessage = winston.format.printf((info) => {
    return `[${info.timestamp} ${info.level}]: ${info.message}`;
  });

  logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.colorize({ all: true }),
          winston.format.splat(),
          winston.format.simple(),
          winston.format.prettyPrint(),
          this.formattingMessage,
        ),
      }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
  });

  info(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  error(message: string, context?: string): void {
    this.logger.error(message, { context });
  }
}

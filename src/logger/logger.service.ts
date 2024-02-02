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
    ],
  });

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }
}

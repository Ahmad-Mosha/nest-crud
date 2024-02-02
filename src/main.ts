import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exceptions/exception.filter';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const loggerService = new LoggerService();
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));
  await app.listen(3000);
}
bootstrap();

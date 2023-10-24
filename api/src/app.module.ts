import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from './http/http.module';
import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './core/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, HttpModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from './http/http.module';
import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './core/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, HttpModule, AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

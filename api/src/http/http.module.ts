/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './controllers/user/user.controller';
import { GetAllUsers } from 'src/app/use-cases/get-all-users';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [GetAllUsers],
})
export class HttpModule {}

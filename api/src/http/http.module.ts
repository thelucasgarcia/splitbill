/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './controllers/user/user.controller';
import { GetAllUsers } from 'src/app/use-cases/user/get-all-users';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { EditUser } from 'src/app/use-cases/user/edit-user';

import { FindOneUser } from 'src/app/use-cases/user/find-one-user';
import { RegisterAuth } from 'src/app/use-cases/auth/register.auth';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    GetAllUsers, 
    FindOneUser, 
    CreateUser, 
    EditUser, 
    RegisterAuth
  ],
})
export class HttpModule {}

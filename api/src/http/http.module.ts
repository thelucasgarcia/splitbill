/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RegisterAuth } from 'src/app/use-cases/auth/register.auth';
import { CreateBill } from 'src/app/use-cases/bill/create-bill';
import { EditBill } from 'src/app/use-cases/bill/edit-bill';
import { FindOneBill } from 'src/app/use-cases/bill/find-one-bill';
import { GetAllBills } from 'src/app/use-cases/bill/get-all-bills';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { EditUser } from 'src/app/use-cases/user/edit-user';
import { FindOneUser } from 'src/app/use-cases/user/find-one-user';
import { GetAllUsers } from 'src/app/use-cases/user/get-all-users';
import { DatabaseModule } from 'src/database/database.module';
import { BillController } from './controllers/bill/bill.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, BillController],
  providers: [
    GetAllUsers,
    FindOneUser,
    CreateUser,
    EditUser,
    RegisterAuth,
    GetAllBills,
    FindOneBill,
    CreateBill,
    EditBill,
  ],
})
export class HttpModule { }

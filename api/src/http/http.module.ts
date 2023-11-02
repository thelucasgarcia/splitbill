import { Module } from '@nestjs/common';

import { RegisterAuth } from 'src/app/use-cases/auth/register.auth';
import { CreateBillItem } from 'src/app/use-cases/bill-item/create-bill-item';
import { DeleteBillItem } from 'src/app/use-cases/bill-item/delete-bill-item';
import { EditBillItem } from 'src/app/use-cases/bill-item/edit-bill-item';
import { FindOneBillItem } from 'src/app/use-cases/bill-item/find-one-bill-item';
import { ToggleBillMember } from 'src/app/use-cases/bill-member/toggle-bill-member';
import { CreateBill } from 'src/app/use-cases/bill/create-bill';
import { DeleteBill } from 'src/app/use-cases/bill/delete-bill';
import { EditBill } from 'src/app/use-cases/bill/edit-bill';
import { FindOneBill } from 'src/app/use-cases/bill/find-one-bill';
import { GetAllBills } from 'src/app/use-cases/bill/get-all-bills';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { EditUser } from 'src/app/use-cases/user/edit-user';
import { FindOneUser } from 'src/app/use-cases/user/find-one-user';
import { GetAllUsers } from 'src/app/use-cases/user/get-all-users';

import { DatabaseModule } from 'src/database/database.module';

import { BillItemController } from './controllers/bill-item/bill-item.controller';
import { BillMemberController } from './controllers/bill-member/bill-member.controller';
import { BillController } from './controllers/bill/bill.controller';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UserController,
    BillController,
    BillItemController,
    BillMemberController,
  ],
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
    DeleteBill,
    FindOneBillItem,
    CreateBillItem,
    EditBillItem,
    DeleteBillItem,
    ToggleBillMember,
  ],
})
export class HttpModule {}

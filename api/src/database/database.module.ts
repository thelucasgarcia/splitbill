import { Module } from '@nestjs/common';
import { AuthRepository } from 'src/app/repositories/auth.repository';
import { BillRepository } from 'src/app/repositories/bill.repository';
import { BillItemRepository } from 'src/app/repositories/bill-item.repository';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAuthRepository } from './prisma/repositories/prisma-auth.repository';
import { PrismaBillRepository } from './prisma/repositories/prisma-bill.repository';
import { PrismaBillItemRepository } from './prisma/repositories/prisma-bill-item.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { BillMemberRepository } from 'src/app/repositories/bill-member.repository';
import { PrismaBillMemberRepository } from './prisma/repositories/prisma-bill-member.repository';
@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: AuthRepository,
      useClass: PrismaAuthRepository,
    },
    {
      provide: BillRepository,
      useClass: PrismaBillRepository,
    },
    {
      provide: BillItemRepository,
      useClass: PrismaBillItemRepository,
    },
    {
      provide: BillMemberRepository,
      useClass: PrismaBillMemberRepository,
    },
  ],
  exports: [
    UsersRepository,
    AuthRepository,
    BillRepository,
    BillItemRepository,
    BillMemberRepository,
  ],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { AuthRepository } from 'src/app/repositories/auth.repository';
import { PrismaAuthRepository } from './prisma/repositories/prisma-auth.repository';
import { BillRepository } from 'src/app/repositories/bill.repository';
import { PrismaBillRepository } from './prisma/repositories/prisma-bill.repository';
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
  ],
  exports: [UsersRepository, AuthRepository, BillRepository],
})
export class DatabaseModule {}

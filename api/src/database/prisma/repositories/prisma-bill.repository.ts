import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateBillDto } from 'src/app/dto/bill/create-bill.dto';
import { EditBillDto } from 'src/app/dto/bill/edit-bill.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { BillEntity } from 'src/app/entities/bill.entity';
import { BillRepository } from 'src/app/repositories/bill.repository';
import { BillExceptionEnum } from 'src/lib/exceptions/bill.exception.enum';
import { PrismaBillMapper } from '../mappers/prisma-bill-mapper';
import { PrismaService } from '../prisma.service';
import { UsersRepository } from 'src/app/repositories/users.repository';

@Injectable()
export class PrismaBillRepository implements BillRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UsersRepository,
  ) {}

  private includeUser: boolean | Prisma.UserDefaultArgs<DefaultArgs> = {
    select: {
      id: true,
      name: true,
      email: true,
    },
  };

  private includeMembers: boolean | Prisma.BillMemberDefaultArgs<DefaultArgs> =
    {
      select: {
        id: true,
        billId: true,
        memberId: true,
        member: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    };

  async findAll(): Promise<BillEntity[]> {
    try {
      const bills = await this.prisma.bill.findMany({
        include: {
          user: this.includeUser,
          members: true,
        },
      });
      return bills.map(PrismaBillMapper.toDomain);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async findById(id: string): Promise<BillEntity | null> {
    const bill = await this.prisma.bill.findUnique({
      where: { id },
      include: {
        user: this.includeUser,
        items: true,
        members: this.includeMembers,
      },
    });

    if (!bill) {
      throw new NotFoundException({
        code: 'BILL_NOT_FOUND',
        message: BillExceptionEnum.BILL_NOT_FOUND,
      });
    }

    return PrismaBillMapper.toDomain(bill);
  }

  async create(bill: CreateBillDto, userId: string): Promise<BillEntity> {
    try {
      const user = await this.userRepository.findById(userId);
      const createdBill = await this.prisma.bill.create({
        data: {
          ...bill,
          userId: user.id,
          members: {
            create: {
              memberId: user.id,
            },
          },
        },
        include: {
          user: this.includeUser,
          members: this.includeMembers,
        },
      });

      return PrismaBillMapper.toDomain(createdBill);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async update(
    { id }: FindOneParamDto,
    editBill: EditBillDto,
  ): Promise<BillEntity> {
    try {
      const updatedBill = await this.prisma.$transaction(async (ctx) => {
        const currentBill = await this.findById(id);

        return await ctx.bill.update({
          where: { id: currentBill.id },
          data: {
            name: editBill.name,
            tag: editBill.tag,
            description: editBill.description,
            editValues: editBill.editValues,
            inviteMembers: editBill.inviteMembers,
          },
          include: {
            user: this.includeUser,
          },
        });
      });

      return PrismaBillMapper.toDomain(updatedBill);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async delete(id: string): Promise<BillEntity> {
    try {
      const bill = await this.findById(id);
      const removedBill = await this.prisma.bill.delete({
        where: { id: bill.id },
      });

      return PrismaBillMapper.toDomain(removedBill);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}

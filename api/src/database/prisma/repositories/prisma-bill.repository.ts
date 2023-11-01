import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBillDto } from 'src/app/dto/bill/create-bill.dto';
import { EditBillDto } from 'src/app/dto/bill/edit-bill.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { BillEntity } from 'src/app/entities/bill.entity';
import { BillRepository } from 'src/app/repositories/bill.repository';
import { BillExceptionEnum } from 'src/lib/enums/bill.exception.enum';
import { PrismaBillMapper } from '../mappers/prisma-bill-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBillRepository implements BillRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<BillEntity[]> {
    const bill = await this.prisma.bill.findMany();
    return bill.map(PrismaBillMapper.toDomain);
  }

  async findById(id: string): Promise<BillEntity | null> {
    try {
      const bill = await this.prisma.bill.findUnique({ where: { id } });
      if (!bill) {
        throw new NotFoundException({
          code: 'BILL_NOT_FOUND',
          message: BillExceptionEnum.BILL_NOT_FOUND,
        });
      }
      return PrismaBillMapper.toDomain(bill);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(bill: CreateBillDto, userId: string): Promise<BillEntity> {
    const createdBill = await this.prisma.bill.create({
      data: {
        ...bill,
        userId,
      },
    });

    return PrismaBillMapper.toDomain(createdBill);
  }

  async update(
    { id }: FindOneParamDto,
    editBill: EditBillDto,
  ): Promise<BillEntity> {
    const updatedBill = await this.prisma.$transaction(async (ctx) => {
      const currentBill = await ctx.bill.findUnique({ where: { id: id } });

      if (!currentBill) {
        throw new NotFoundException({
          code: 'BILL_NOT_FOUND',
          message: BillExceptionEnum.BILL_NOT_FOUND,
        });
      }

      return await ctx.bill.update({
        where: { id: id },
        data: {
          ...PrismaBillMapper.toPrisma(new BillEntity(editBill, id)),
        },
      });
    });

    return PrismaBillMapper.toDomain(updatedBill);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

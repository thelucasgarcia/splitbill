import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillItemDto } from 'src/app/dto/bill-item/create-bill-item.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';

import { EditBillItemDto } from 'src/app/dto/bill-item/edit-bill-item.dto';
import { BillItemEntity } from 'src/app/entities/bill-item.entity';
import { BillItemRepository } from 'src/app/repositories/bill-item.repository';
import { BillRepository } from 'src/app/repositories/bill.repository';
import { BillItemExceptionEnum } from 'src/lib/exceptions/item-bill.exception.enum';
import { PrismaBillItemMapper } from '../mappers/prisma-bill-item-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBillItemRepository implements BillItemRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly billRepository: BillRepository,
  ) {}

  async findAll(): Promise<BillItemEntity[]> {
    try {
      const items = await this.prisma.billItem.findMany();
      return items.map(PrismaBillItemMapper.toDomain);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async findById(id: string): Promise<BillItemEntity | null> {
    try {
      const item = await this.prisma.billItem.findUnique({
        where: { id },
      });

      if (!item) {
        throw new NotFoundException({
          code: 'BILL_ITEM_NOT_FOUND',
          message: BillItemExceptionEnum.BILL_ITEM_NOT_FOUND,
        });
      }

      return PrismaBillItemMapper.toDomain(item);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async create(data: CreateBillItemDto): Promise<BillItemEntity> {
    try {
      const bill = await this.billRepository.findById(data.billId);
      const item = await this.prisma.billItem.create({
        data: {
          billId: bill.id,
          name: data.name,
          price: data.price,
          quantity: data.quantity,
        },
      });

      return PrismaBillItemMapper.toDomain(item);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async update(
    { id }: FindOneParamDto,
    editBill: EditBillItemDto,
  ): Promise<BillItemEntity> {
    try {
      const updatedBill = await this.prisma.$transaction(async (ctx) => {
        const currentBill = await this.findById(id);

        return await ctx.billItem.update({
          where: { id: currentBill.id },
          data: {
            name: editBill.name,
            price: editBill.price,
            quantity: editBill.quantity,
          },
        });
      });

      return PrismaBillItemMapper.toDomain(updatedBill);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async delete(id: string): Promise<BillItemEntity> {
    try {
      const bill = await this.findById(id);
      const item = await this.prisma.billItem.delete({
        where: { id: bill.id },
      });

      return PrismaBillItemMapper.toDomain(item);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}

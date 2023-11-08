import { Injectable } from '@nestjs/common';
import { CreateBillItemDto } from 'src/app/dto/bill-item/create-bill-item.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';

import { EditBillItemDto } from 'src/app/dto/bill-item/edit-bill-item.dto';
import { BillItemEntity } from 'src/app/entities/bill-item.entity';
import { BillItemNotFoundException } from 'src/app/exceptions/bill-item/bill-Item-not-found.exception';
import { BillItemRepository } from 'src/app/repositories/bill-item.repository';
import { BillRepository } from 'src/app/repositories/bill.repository';
import { PrismaBillItemMapper } from '../mappers/prisma-bill-item-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBillItemRepository implements BillItemRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly billRepository: BillRepository,
  ) {}

  async findAll(): Promise<BillItemEntity[]> {
    const items = await this.prisma.billItem.findMany();
    return items.map(PrismaBillItemMapper.toDomain);
  }

  async findById(id: string): Promise<BillItemEntity | null> {
    const item = await this.prisma.billItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new BillItemNotFoundException();
    }

    return PrismaBillItemMapper.toDomain(item);
  }

  async create(data: CreateBillItemDto): Promise<BillItemEntity> {
    const bill = await this.billRepository.findById(data.billId);

    if (data.participants) {
      const billMembersId = bill.members.map((el) => el.memberId);
      data.participants.forEach((el, index) => {
        const hasMember = billMembersId.includes(el.memberId);
        console.log(bill.members, billMembersId, hasMember, el.memberId);
        if (!hasMember) {
          data.participants.splice(index, 1);
        }
      });
    }

    console.log(data.participants);

    const item = await this.prisma.billItem.create({
      data: {
        billId: bill.id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        type: data.type,
        members: {
          createMany: {
            data: [
              {
                id: bill.id,
                memberId: '813c6f7b-eaac-4d39-bd19-1e49c8bca063',
                percentage: 100,
              },
            ],
          },
        },
      },
      include: {
        members: true,
      },
    });

    console.log(item);

    return PrismaBillItemMapper.toDomain(item);
  }

  async update(
    { id }: FindOneParamDto,
    editBill: EditBillItemDto,
  ): Promise<BillItemEntity> {
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
  }

  async delete(id: string): Promise<BillItemEntity> {
    const bill = await this.findById(id);
    const item = await this.prisma.billItem.delete({
      where: { id: bill.id },
    });

    return PrismaBillItemMapper.toDomain(item);
  }
}

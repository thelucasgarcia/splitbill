import { Injectable } from '@nestjs/common';
import { CreateBillItemDto } from 'src/app/dto/bill-item/create-bill-item.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';

import { EditBillItemDto } from 'src/app/dto/bill-item/edit-bill-item.dto';
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

  async findAll() {
    const items = await this.prisma.billItem.findMany();
    return items.map(PrismaBillItemMapper.toDomain);
  }

  async findById(id: string) {
    const item = await this.prisma.billItem.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            member: {
              include: {
                member: true,
              },
            },
          },
        },
      },
    });

    if (!item) {
      throw new BillItemNotFoundException();
    }

    return PrismaBillItemMapper.toDomain(item);
  }

  async create(data: CreateBillItemDto) {
    const bill = await this.billRepository.findById(data.billId);
    const participants = [];
    if (data.participants) {
      data.participants.forEach((el) => {
        const hasMember = bill.members.find(
          (member) => member.memberId === el.memberId,
        );
        if (hasMember) {
          participants.push({
            memberId: hasMember.id,
            percentage: Number(el.percentage),
          });
        }
      });
    }

    const item = await this.prisma.billItem.create({
      data: {
        billId: bill.id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        type: data.type,
        members: {
          createMany: {
            data: participants,
          },
        },
      },
      include: {
        members: true,
      },
    });

    return PrismaBillItemMapper.toDomain(item);
  }

  async update({ id }: FindOneParamDto, editBill: EditBillItemDto) {
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

  async delete(id: string) {
    const bill = await this.findById(id);
    const item = await this.prisma.billItem.delete({
      where: { id: bill.id },
    });

    return PrismaBillItemMapper.toDomain(item);
  }
}

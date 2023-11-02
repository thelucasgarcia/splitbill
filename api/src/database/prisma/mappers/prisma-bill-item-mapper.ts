import { Prisma, BillItem as RawBillItem } from '@prisma/client';
import { BillItemEntity } from 'src/app/entities/bill-item.entity';

export class PrismaBillItemMapper {
  static toPrisma(data: BillItemEntity): RawBillItem {
    return {
      id: data?.id,
      name: data?.name,
      billId: data.billId,
      price: new Prisma.Decimal(data.price),
      quantity: data.quantity,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    };
  }

  static toDomain(data: RawBillItem): BillItemEntity {
    return new BillItemEntity(
      {
        ...data,
        price: data.price.toNumber(),
      },
      data.id,
    );
  }
}

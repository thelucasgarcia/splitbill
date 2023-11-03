import {
  Prisma,
  BillType as RawBillType,
  BillItem as RawBillItem,
} from '@prisma/client';
import { BillItemEntity, BillType } from 'src/app/entities/bill-item.entity';
export class PrismaBillItemMapper {
  static toPrisma(data: BillItemEntity): RawBillItem {
    return {
      id: data?.id,
      name: data?.name,
      billId: data.billId,
      price: new Prisma.Decimal(data.price),
      type: RawBillType[data.type],
      quantity: data.quantity,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    };
  }

  static toDomain(data: RawBillItem): BillItemEntity {
    return new BillItemEntity(
      {
        ...data,
        type: BillType[data.type],
        price: data.price.toNumber(),
      },
      data.id,
    );
  }
}

import { Bill as RawBill } from '@prisma/client';
import { BillEntity } from 'src/app/entities/bill.entity';

export class PrismaBillMapper {
  static toPrisma(data: BillEntity): RawBill {
    return {
      id: data?.id,
      name: data?.name,
      tag: data?.tag,
      userId: data?.userId || data?.user.id,
      description: data.description,
      editValues: data.editValues,
      inviteMembers: data.inviteMembers,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      deletedAt: data?.deletedAt,
    };
  }

  static toDomain(data: RawBill): BillEntity {
    return new BillEntity(data, data.id);
  }
}

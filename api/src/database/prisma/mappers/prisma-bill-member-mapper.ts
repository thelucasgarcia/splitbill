import { BillMember as RawBillMember } from '@prisma/client';
import { BillMemberEntity } from 'src/app/entities/bill-member.entity';

export class PrismaBillMemberMapper {
  static toPrisma(data: BillMemberEntity): RawBillMember {
    return {
      id: data?.id,
      billId: data?.billId,
      memberId: data?.memberId,
    };
  }

  static toDomain(data: RawBillMember): BillMemberEntity {
    return new BillMemberEntity(data, data?.id);
  }
}

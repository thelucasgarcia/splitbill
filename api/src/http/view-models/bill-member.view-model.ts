import { BillMemberEntity } from 'src/app/entities/bill-member.entity';

export class BillMemberViewModel {
  static toHTTP(data: BillMemberEntity) {
    return {
      id: data.id,
      bill: data.bill,
      member: data.member,
    };
  }
}

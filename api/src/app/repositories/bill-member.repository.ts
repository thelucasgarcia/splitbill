import { ToggleBillMemberDto } from '../dto/bill-member/toggle-member-bill.dto';
import { BillMemberEntity } from '../entities/bill-member.entity';

export abstract class BillMemberRepository {
  abstract toggle(data: ToggleBillMemberDto): Promise<BillMemberEntity>;
}

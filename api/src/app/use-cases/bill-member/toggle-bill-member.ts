import { Injectable } from '@nestjs/common';
import { ToggleBillMemberDto } from 'src/app/dto/bill-member/toggle-member-bill.dto';
import { BillMemberEntity } from 'src/app/entities/bill-member.entity';
import { BillMemberRepository } from 'src/app/repositories/bill-member.repository';

@Injectable()
export class ToggleBillMember {
  constructor(private repository: BillMemberRepository) {}

  async execute(data: ToggleBillMemberDto): Promise<BillMemberEntity> {
    return await this.repository.toggle(data);
  }
}

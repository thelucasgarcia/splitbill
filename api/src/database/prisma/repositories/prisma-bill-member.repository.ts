import { Injectable } from '@nestjs/common';

import { ToggleBillMemberDto } from 'src/app/dto/bill-member/toggle-member-bill.dto';
import { BillMemberEntity } from 'src/app/entities/bill-member.entity';
import { BillMemberRepository } from 'src/app/repositories/bill-member.repository';
import { BillRepository } from 'src/app/repositories/bill.repository';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { PrismaBillMemberMapper } from '../mappers/prisma-bill-member-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBillMemberRepository implements BillMemberRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly billRepository: BillRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async toggle(data: ToggleBillMemberDto): Promise<BillMemberEntity> {
    const bill = await this.billRepository.findById(data.billId);
    const user = await this.userRepository.findById(data.memberId);
    const isUserBill = bill.userId === user.id;

    const hasMember = await this.prisma.billMember.findFirst({
      where: {
        billId: bill.id,
        memberId: user.id,
      },
    });

    if (!hasMember) {
      const addMember = await this.prisma.billMember.create({
        data: {
          billId: bill.id,
          memberId: user.id,
        },
      });

      return PrismaBillMemberMapper.toDomain(addMember);
    }

    if (!isUserBill) {
      const removedMember = await this.prisma.billMember.delete({
        where: {
          id: hasMember.id,
        },
      });
      return PrismaBillMemberMapper.toDomain(removedMember);
    }

    return PrismaBillMemberMapper.toDomain(hasMember);
  }
}

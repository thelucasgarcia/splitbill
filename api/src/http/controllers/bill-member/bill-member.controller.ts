import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ToggleBillMemberDto } from 'src/app/dto/bill-member/toggle-member-bill.dto';
import { ToggleBillMember } from 'src/app/use-cases/bill-member/toggle-bill-member';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { BillMemberViewModel } from 'src/http/view-models/bill-member.view-model';

@ApiBearerAuth()
@ApiTags('Bill Members')
@UseGuards(JwtAuthGuard)
@Controller('bill/member')
export class BillMemberController {
  constructor(private readonly useToggleMember: ToggleBillMember) {}

  @Put()
  async create(@Body() body: ToggleBillMemberDto) {
    const response = await this.useToggleMember.execute(body);
    return BillMemberViewModel.toHTTP(response);
  }
}

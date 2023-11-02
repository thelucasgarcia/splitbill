import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ToggleBillMemberDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly billId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly memberId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/app/entities/user.entity';

export class ResponseBillDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly user: UserEntity;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly editValues: boolean;

  @ApiProperty()
  readonly inviteMembers: boolean;

  @ApiProperty()
  readonly tag: string[];

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}

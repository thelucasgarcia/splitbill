import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneUserParamDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneParamDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

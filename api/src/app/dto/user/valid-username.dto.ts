import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ValidUsernameParamDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Length(3, 50)
  readonly username: string;
}

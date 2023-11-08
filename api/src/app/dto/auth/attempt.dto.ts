import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  Length,
  IsOptional,
  IsNumberString,
  MaxLength,
} from 'class-validator';
import { IsCPF } from 'src/lib/validator/isCpf.validator';

export class AttemptRegisterDto {
  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsOptional()
  @Length(3, 50)
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsOptional()
  @IsCPF()
  @ApiProperty()
  readonly cpf: string;

  @IsNumberString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(13)
  @ApiProperty()
  readonly phone: string;
}

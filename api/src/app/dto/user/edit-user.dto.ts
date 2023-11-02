import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCPF } from 'src/lib/validator/isCpf.validator';

export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  readonly picture: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsCPF()
  @ApiProperty()
  readonly cpf: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(9)
  @MaxLength(13)
  @ApiProperty()
  readonly phone: string;
}

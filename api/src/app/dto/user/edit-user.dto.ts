import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCPF } from 'src/lib/validator/isCpf.validator';

export class EditUserParamDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  readonly name: string;

  @IsCPF()
  @IsNotEmpty()
  @IsOptional()
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

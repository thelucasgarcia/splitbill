import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EditBillDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(30, { each: true })
  @ApiProperty()
  readonly tag: string[];
}

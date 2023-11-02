import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateBillDto {
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

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  readonly description: string;
}

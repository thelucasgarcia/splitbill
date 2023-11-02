import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class EditBillItemDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100000)
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10000)
  @ApiProperty()
  readonly quantity: number;
}

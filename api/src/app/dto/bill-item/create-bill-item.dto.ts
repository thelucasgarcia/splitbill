import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBillItemDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly billId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @Min(1)
  @Max(100000)
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @Min(1)
  @Max(10000)
  @ApiProperty()
  readonly quantity: number;
}

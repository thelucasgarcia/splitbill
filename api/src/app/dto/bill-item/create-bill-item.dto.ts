import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { BillType } from 'src/app/entities/bill-item.entity';
class ParticipantDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly memberId: string;

  @Min(0)
  @Max(100)
  @IsNotEmpty()
  @ApiProperty()
  readonly percentage: number;
}
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
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;

  @IsEnum(BillType)
  @IsNotEmpty()
  @ApiProperty({
    enum: BillType,
  })
  readonly type: BillType;

  @IsArray()
  @IsObject({ each: true })
  readonly participants: ParticipantDto[];
}

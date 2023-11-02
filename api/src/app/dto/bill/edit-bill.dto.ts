import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EditBillDto {
  @IsString()
  @IsOptional()
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

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly editValues: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly inviteMembers: boolean;
}

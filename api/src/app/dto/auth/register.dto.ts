import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  Length,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty()
  readonly username: string;
}

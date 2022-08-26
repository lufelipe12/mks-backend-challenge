import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSchema {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  @MaxLength(30)
  @ApiProperty({ description: 'Your name', maximum: 30 })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  @MaxLength(60)
  @ApiProperty({ description: 'Your email', maximum: 30 })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @ApiProperty({
    description: 'Your desired password',
    minimum: 4,
    maximum: 30,
  })
  password: string;
}

export class UserUpdateSchema extends PartialType(UserSchema) {}

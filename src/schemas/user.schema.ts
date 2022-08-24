import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserSchema {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  @MaxLength(60)
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  password: string;
}

export class UserUpdateSchema extends PartialType(UserSchema) {}

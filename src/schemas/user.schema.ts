import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserSchema {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsEmail()
  @MaxLength(60)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  password: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SessionSchema {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  @ApiProperty({ description: 'Your email' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  @ApiProperty({ description: 'Your password' })
  password: string;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModel } from 'src/models/user.model';
import { AuthService } from '../services/sessions/auth.service';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtStategy } from 'src/strategies/jwt.strategy';
import { UsersService } from 'src/services/users/users.service';
import { SessionsController } from 'src/controllers/session.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserModel]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SessionsController],
  providers: [AuthService, LocalStrategy, JwtStategy, UsersService],
  exports: [AuthService, LocalStrategy, JwtStategy, UsersService],
})
export class AuthModule {}

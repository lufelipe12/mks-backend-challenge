import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsController } from 'src/controllers/session.controller';
import { UserModel } from 'src/models/user.model';
import { AuthService } from '../services/sessions/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [SessionsController],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}

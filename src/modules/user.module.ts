import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '../controllers/user.controller';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}

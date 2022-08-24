import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeOrm-config';
import { UsersModule } from './modules/user.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRootAsync(typeOrmAsyncConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

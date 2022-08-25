import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './config/typeOrm-config';
import { AuthModule } from './modules/auth.module';
import { MoviesModule } from './modules/movie.module';
import { UsersModule } from './modules/user.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MoviesModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

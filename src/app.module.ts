import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';

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
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
})
export class AppModule {}

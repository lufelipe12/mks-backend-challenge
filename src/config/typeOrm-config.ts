import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      url: process.env.DATABASE_URL,
      // port: +process.env.DB_PORT,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
      synchronize: false,
      logging: true,
      entities: [__dirname + '/../**/*.model.{js,ts}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../migrations',
      },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  url: process.env.DATABASE_URL,
  // port: +process.env.DB_PORT,
  // username: process.env.DB_USERNAME,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  entities: [__dirname + '/../**/*.model.{js,ts}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
};

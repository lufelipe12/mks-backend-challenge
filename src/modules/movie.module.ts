import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from 'src/controllers/movie.controller';
import { MovieModel } from 'src/models/movie.model';

@Module({
  imports: [TypeOrmModule.forFeature([MovieModel])],
  controllers: [MoviesController],
})
export class MoviesModule {}

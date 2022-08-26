import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from '../controllers/movie.controller';
import { MovieModel } from '../models/movie.model';
import { MoviesService } from '../services/movies/movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieModel])],
  controllers: [MoviesController],
  exports: [MoviesService],
  providers: [MoviesService],
})
export class MoviesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from 'src/controllers/movie.controller';
import { MovieModel } from 'src/models/movie.model';
import { MoviesService } from 'src/services/movies/movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieModel])],
  controllers: [MoviesController],
  exports: [MoviesService],
  providers: [MoviesService],
})
export class MoviesModule {}

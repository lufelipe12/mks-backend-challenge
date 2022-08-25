import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { MovieSchema } from 'src/schemas/movie.schema';
import { MoviesService } from 'src/services/movies/movies.service';

@Controller('/movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  public async store(@Body() body: MovieSchema) {
    const newMovie = await this.moviesService.create(body);

    return newMovie;
  }

  @Get()
  public async index() {
    const movies = await this.moviesService.getAll();

    return movies;
  }

  @Get(':id')
  public async show() {
    return { movie: 'Get one' };
  }

  @Patch(':id')
  public async update() {
    return { movie: 'Updated' };
  }

  @Delete(':id')
  public async delete() {
    return { movie: 'Deleted' };
  }
}

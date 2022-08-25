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
import { MovieSchema, MovieUpdateSchema } from 'src/schemas/movie.schema';
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
  public async show(@Param('id', ParseIntPipe) id: number) {
    const movie = await this.moviesService.getOne(id);

    return movie;
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: MovieUpdateSchema
  ) {
    const movieUpdated = await this.moviesService.update(id, body);

    return movieUpdated;
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.moviesService.delete(id);

    return result;
  }
}

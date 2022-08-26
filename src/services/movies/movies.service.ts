import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovieModel } from '../../models/movie.model';
import { MovieSchema, MovieUpdateSchema } from '../../schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieModel) private model: Repository<MovieModel>
  ) {}

  async create(data: MovieSchema) {
    const movieExists = await this.model.findOne({
      where: { name: data.name },
    });

    if (movieExists) {
      throw new HttpException(
        'A movie with this name already exists',
        HttpStatus.CONFLICT
      );
    }

    const newMovie = this.model.create(data);

    await this.model.save(newMovie);

    return newMovie;
  }

  async getAll() {
    const movies = await this.model.find();

    return movies;
  }

  async getOne(id: number) {
    const movie = await this.model.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException({ description: 'Movie not found.' });
    }

    return movie;
  }

  async update(id: number, data: MovieUpdateSchema) {
    const movie = await this.model.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException({ description: 'Movie not found.' });
    }

    if (data.name) {
      const movieExists = await this.model.findOne({
        where: { name: data.name },
      });

      if (movieExists) {
        throw new HttpException(
          'A movie with this name already exists',
          HttpStatus.CONFLICT
        );
      }
    }

    await this.model.update(movie, data);

    return await this.model.findOne({ where: { id } });
  }

  async delete(id: number) {
    const movie = await this.model.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException({ description: 'Movie not found.' });
    }

    await this.model.delete(movie);

    return { message: 'Movie deleted with success.' };
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { MovieModel } from 'src/models/movie.model';
import { MovieSchema } from 'src/schemas/movie.schema';

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
}

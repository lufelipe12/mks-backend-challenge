<<<<<<< Updated upstream
import { Injectable } from '@nestjs/common';
=======
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovieModel } from 'src/models/movie.model';
import { MovieSchema } from 'src/schemas/movie.schema';
>>>>>>> Stashed changes

@Injectable()
export class MoviesService {}

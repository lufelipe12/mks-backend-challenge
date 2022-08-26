import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class MovieSchema {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  @MaxLength(30)
  @ApiProperty({ description: 'The name of the movie', maximum: 30 })
  name: string;

  @IsNotEmpty({ message: 'synopsis is required' })
  @IsString()
  @MaxLength(60)
  @ApiProperty({ description: 'The synopsis of the movie', maximum: 30 })
  synopsis: string;

  @IsNotEmpty({ message: 'duration is required' })
  @IsNumber()
  @ApiProperty({ description: 'The duration of the movie', maximum: 30 })
  duration: number;

  @IsNotEmpty({ message: 'director is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty({ description: 'Movie director', maximum: 30 })
  director: string;
}

export class MovieUpdateSchema extends PartialType(MovieSchema) {}

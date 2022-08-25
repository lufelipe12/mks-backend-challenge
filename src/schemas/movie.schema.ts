import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class MovieSchema {
  @IsNotEmpty({ message: 'name is required' })
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty({ message: 'synopsis is required' })
  @IsString()
  @MaxLength(60)
  synopsis: string;

  @IsNotEmpty({ message: 'duration is required' })
  @IsNumber()
  duration: number;

  @IsNotEmpty({ message: 'director is required' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  director: string;
}

export class MovieUpdateSchema extends PartialType(MovieSchema) {}

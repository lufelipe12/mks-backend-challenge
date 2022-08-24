import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('/movies')
export class MoviesController {
  @Post()
  public async store() {
    return { movie: 'Created' };
  }

  @Get()
  public async index() {
    return { movie: 'Get all' };
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

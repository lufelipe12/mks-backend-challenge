import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import { UserModel } from 'src/models/user.model';
import { UserSchema } from 'src/schemas/user.schema';

@Controller('/users')
export class UsersController {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>
  ) {}

  @Post('/register')
  public async create(@Body() body: UserSchema): Promise<{ data: UserModel }> {
    const userExists = await this.model.findOne({
      where: { email: body.email },
    });

    if (userExists) {
      throw new HttpException(
        'An user with this email already exists',
        HttpStatus.CONFLICT
      );
    }

    const hashedPassword = await hash(body.password, 8);

    const userToCreate = {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    };

    const newUser = await this.model.save(userToCreate);

    return { data: newUser };
  }

  @Get()
  public async getAll(): Promise<{ data: UserModel[] }> {
    const users = await this.model.find();

    return { data: users };
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<{ data: UserModel }> {
    const user = await this.model.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ description: 'User not found.' });
    }

    return { data: user };
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UserSchema
  ): Promise<{ data: UserModel }> {
    const user = await this.model.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ description: 'User not found.' });
    }

    await this.model.update({ id }, body);

    return {
      data: await this.model.findOne({
        where: { id },
      }),
    };
  }

  @Delete(':id')
  public delete(): any {
    return { data: 'Delete!!' };
  }
}

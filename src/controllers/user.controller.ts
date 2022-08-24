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
import { instanceToPlain } from 'class-transformer';

import { UserModel } from 'src/models/user.model';
import { UserSchema, UserUpdateSchema } from 'src/schemas/user.schema';

@Controller('/users')
export class UsersController {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>
  ) {}

  @Post('/register')
  public async create(@Body() body: UserSchema) {
    const emailExists = await this.model.findOne({
      where: { email: body.email },
    });

    if (emailExists) {
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

    const newUser = this.model.create(userToCreate);

    await this.model.save(newUser);

    return instanceToPlain(newUser);
  }

  @Get()
  public async getAll() {
    const users = await this.model.find();

    return instanceToPlain(users);
  }

  @Get(':id')
  public async getOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.model.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ description: 'User not found.' });
    }

    return instanceToPlain(user);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UserUpdateSchema
  ) {
    const user = await this.model.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ description: 'User not found.' });
    }

    if (body.email) {
      const emailExists = await this.model.findOne({
        where: { email: body.email },
      });

      if (emailExists) {
        throw new HttpException(
          'An user with this email already exists',
          HttpStatus.CONFLICT
        );
      }
    }

    const userToUpdate = {
      name: body.name,
      email: body.email,
      password: body.password ? await hash(body.password, 8) : user.password,
    };

    await this.model.update({ id }, userToUpdate);

    return instanceToPlain(
      await this.model.findOne({
        where: { id },
      })
    );
  }

  @Delete(':id')
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.model.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ description: 'User not found.' });
    }

    await this.model.delete({ id });

    return 'User deleted with success.';
  }
}

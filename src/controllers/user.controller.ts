import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

import { UserSchema, UserUpdateSchema } from 'src/schemas/user.schema';
import { UsersService } from 'src/services/users/users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  public async store(@Body() body: UserSchema) {
    const newUser = await this.usersService.create(body);

    return instanceToPlain(newUser);
  }

  @Get()
  public async index() {
    const users = await this.usersService.getAll();

    return instanceToPlain(users);
  }

  @Get(':id')
  public async show(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.getOne(id);

    return instanceToPlain(user);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UserUpdateSchema
  ) {
    const userUpdated = this.usersService.update(id, body);

    return instanceToPlain(userUpdated);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    const message = await this.usersService.delete(id);

    return message;
  }
}

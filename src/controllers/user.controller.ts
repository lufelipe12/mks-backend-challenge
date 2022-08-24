import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { UserSchema } from 'src/schemas/user.schema';
import { Repository } from 'typeorm';

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
    const newUser = await this.model.save(body);

    return { data: newUser };
  }

  @Get()
  public async getAll(): Promise<{ data: UserModel[] }> {
    const users = await this.model.find();

    return { data: users };
  }

  @Get(':id')
  public getOne(): any {
    return { data: 'Read!!' };
  }

  @Patch(':id')
  public update(): any {
    return { data: 'Update!!' };
  }

  @Delete(':id')
  public delete(): any {
    return { data: 'Delete!!' };
  }
}

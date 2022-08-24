import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Controller('/users')
export class UsersController {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>
  ) {}

  @Post('/register')
  public create(): any {
    return { data: 'Create!!' };
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

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import { UserModel } from 'src/models/user.model';
import { UserSchema, UserUpdateSchema } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>
  ) {}

  async create(data: UserSchema) {
    const emailExists = await this.model.findOne({
      where: { email: data.email },
    });

    if (emailExists) {
      throw new HttpException(
        'An user with this email already exists',
        HttpStatus.CONFLICT
      );
    }

    const hashedPassword = await hash(data.password, 8);

    const userToCreate = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    const newUser = this.model.create(userToCreate);

    await this.model.save(newUser);

    return newUser;
  }

  async getAll() {
    const users = await this.model.find();

    return users;
  }

  async getOne(id: string) {
    const user = await this.model.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ description: 'User not found.' });
    }

    return user;
  }

  async update(id: string, data: UserUpdateSchema) {
    const user = await this.model.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ description: 'User not found.' });
    }

    if (data.email) {
      const emailExists = await this.model.findOne({
        where: { email: data.email },
      });

      if (emailExists) {
        throw new HttpException(
          'An user with this email already exists',
          HttpStatus.CONFLICT
        );
      }
    }

    const userToUpdate = {
      name: data.name,
      email: data.email,
      password: data.password ? await hash(data.password, 8) : user.password,
    };

    await this.model.update({ id }, userToUpdate);

    return await this.model.findOne({
      where: { id },
    });
  }

  async delete(id: string) {
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

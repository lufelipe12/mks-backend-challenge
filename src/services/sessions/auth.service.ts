import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UserModel } from 'src/models/user.model';
import { SessionSchema } from 'src/schemas/sessions.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>
  ) {}

  async login(data: SessionSchema): Promise<string> {
    const user = await this.model.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException({
        description: 'User with this credentials not found.',
      });
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException({
        description: 'User with this credentials not found.',
      });
    }

    const token = sign({}, (process.env.SECRET as string) || 'default', {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

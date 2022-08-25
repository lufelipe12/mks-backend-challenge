import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { UserModel } from 'src/models/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException({
        description: 'Credentials not valid.',
      });
    }

    const passwordMatch = await compare(password, user.password);

    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException({
        description: 'Credentials not valid.',
      });
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

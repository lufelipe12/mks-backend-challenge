import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '../guards/localAuth.guard';
import { SessionSchema } from '../schemas/sessions.schema';
import { AuthService } from '../services/sessions/auth.service';

@ApiTags('Auth')
@Controller('/login')
export class SessionsController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() body: SessionSchema) {
    return this.authService.login(body);
  }
}

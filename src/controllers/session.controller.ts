import { Body, Controller, Post } from '@nestjs/common';
import { SessionSchema } from 'src/schemas/sessions.schema';

import { AuthService } from 'src/services/sessions/auth.service';

@Controller('/login')
export class SessionsController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  public async login(@Body() body: SessionSchema) {
    const token = await this.authService.login(body);

    return { token: token };
  }
}

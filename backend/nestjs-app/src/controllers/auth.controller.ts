import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(
    @Body() body: { username: string; password: string },
  ): Promise<string> {
    const success = await this.authService.signup(body.username, body.password);
    return success ? 'Signup successful' : 'Signup failed';
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<string> {
    const success = await this.authService.login(body.username, body.password);
    return success ? 'Login successful' : 'Login failed';
  }
}

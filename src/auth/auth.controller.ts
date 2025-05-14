import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from '../users/dto/auth-credentials.dto';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.usersService.register(authCredentialsDto);
  }

  @Post('login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialsDto);
  }
}

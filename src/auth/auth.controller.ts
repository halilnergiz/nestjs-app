import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from '../users/dto/auth-credentials.dto';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserPayload } from '../types/user.payload';

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req: Request): UserPayload {
    return req['user'] as UserPayload;
  }
}

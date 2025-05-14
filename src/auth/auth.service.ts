import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './../users/dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');
    }

    // JWT token oluştur
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}

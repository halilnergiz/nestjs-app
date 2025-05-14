import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return this.usersService.register(createUserDto);
  }
}

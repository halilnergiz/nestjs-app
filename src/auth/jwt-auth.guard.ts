import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader: string | undefined = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token bulunamadı.');
    }

    const token = authHeader.split(' ')[1];
    const secret = this.configService.jwtSecret;

    try {
      const decoded = jwt.verify(token, secret);
      request['user'] = decoded;
      console.log(request['user']);
      return true;
    } catch {
      throw new UnauthorizedException('Geçersiz token.');
    }
  }
}

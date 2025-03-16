import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import 'dotenv/config';
import * as process from 'process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? '',
    });
  }

  async validate(user: any) {
    if (!user)
      throw new HttpException(
        "You don't have permission for the current resource",
        HttpStatus.BAD_REQUEST,
      );
    return { id: user.id, username: user.username };
  }
}

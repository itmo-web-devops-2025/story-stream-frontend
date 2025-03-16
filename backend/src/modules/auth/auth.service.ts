import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { checkPassword } from '@/constants/password';
import { UserError } from '@/constants/errorMessage';
import { FastifyRequestWithUser } from '@/modules/auth/auth.types';
import * as process from 'process';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async registerTokens(userInfo: User) {
    const user = await this.userRepository.findOne({
      where: { id: userInfo.id },
    });

    if (!user) return;

    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_ACCESS_EXPIRE });

    return { accessToken };
  }

  async validateUser(loginUserDto: any) {
    const user = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
      select: { id: true, password: true },
    });

    if (!user) throw new NotFoundException(UserError.NotFound);

    if (!(await checkPassword(loginUserDto.password, user.password)))
      throw new BadRequestException(UserError.InvalidPassword);

    return user;
  }

  async login(req: FastifyRequestWithUser) {
    return this.registerTokens(req.user);
  }
}

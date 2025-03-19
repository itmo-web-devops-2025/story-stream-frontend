import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { LocalAuthGuard } from '@/modules/auth/guards/local-auth.guard';
import { FastifyReply } from 'fastify';
import { FastifyRequestWithUser } from '@/modules/auth/auth.types';
import { cookieName, TOKEN_TYPE } from '@/modules/auth/auth.const';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiOkResponse({ description: 'Пользователь успешно аутентифицирован' })
  @ApiBadRequestResponse({ description: 'Проверьте введенные данные' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request: FastifyRequestWithUser,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const tokens = await this.authService.login(request);
    response.setCookie(cookieName[TOKEN_TYPE.Access], tokens?.accessToken ?? '', {
      httpOnly: true,
    });
  }
}

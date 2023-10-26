import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginAuthDto } from 'src/app/dto/auth/login.dto';
import { UserEntity } from 'src/app/entities/user.entity';
import { RegisterAuthDto } from '../app/dto/auth/register.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Req() req: Request, @Body() _param: LoginAuthDto) {
    return await this.authService.login(new UserEntity(req.user));
  }

  @Post('register')
  async register(@Body() param: RegisterAuthDto) {
    return await this.authService.register(param);
  }
}

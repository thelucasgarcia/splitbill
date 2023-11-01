import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginAuthDto } from 'src/app/dto/auth/login.dto';
import { RegisterAuthDto } from '../app/dto/auth/register.dto';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guard/refresh.guard';
import { ValidUsernameParamDto } from 'src/app/dto/user/valid-username.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() param: LoginAuthDto) {
    return await this.authService.signIn(param);
  }

  @Post('signup')
  async signup(@Body() param: RegisterAuthDto) {
    return await this.authService.signUp(param);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const user = req.user;
    return await this.authService.refreshToken(
      user['refreshToken'],
      user['id'],
    );
  }

  @Get('attemp')
  async validUsername(@Query() query: ValidUsernameParamDto) {
    if (query.username) {
      return await this.authService.attemp(query);
    }
    throw new NotFoundException();
  }
}

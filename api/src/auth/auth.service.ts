import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from 'src/app/dto/auth/login.dto';
import { RegisterAuthDto } from 'src/app/dto/auth/register.dto';
import { ValidUsernameParamDto } from 'src/app/dto/user/valid-username.dto';
import { UserEntity } from 'src/app/entities/user.entity';
import { AuthInvalidRefreshTokenException } from 'src/app/exceptions/auth/auth-not-authenticated.exception';
import { ValidUsername } from 'src/app/use-cases/auth/attemp.auth';
import { LoginAuth } from 'src/app/use-cases/auth/login.auth';
import { RegisterAuth } from 'src/app/use-cases/auth/register.auth';
import { FindOneUser } from 'src/app/use-cases/user/find-one-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly useLoginAuth: LoginAuth,
    private readonly useRegisterAuth: RegisterAuth,
    private readonly useFindOneUser: FindOneUser,
    private readonly useValidUsername: ValidUsername,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(param: LoginAuthDto) {
    const user = await this.useLoginAuth.execute(param);
    return this.generateTokens(user);
  }

  async signUp(param: RegisterAuthDto) {
    const user = await this.useRegisterAuth.execute(param);
    return this.generateTokens(user);
  }

  async attemp(param: ValidUsernameParamDto) {
    return await this.useValidUsername.execute(param);
  }

  async refreshToken(token: string, id: string) {
    try {
      await this.jwtService.verifyAsync(token);
      const user = await this.useFindOneUser.execute({ id });
      return this.generateTokens(user);
    } catch (error) {
      throw new AuthInvalidRefreshTokenException(error);
    }
  }

  async generateTokens(user: UserEntity) {
    const [{ access_token }, { refresh_token }] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);
    return { access_token, refresh_token };
  }

  async generateAccessToken(
    payload: UserEntity,
  ): Promise<{ access_token: string }> {
    const data = {
      sub: payload.id,
      email: payload.email,
      name: payload.name,
      username: payload.username,
    };

    const accessToken = await this.jwtService.signAsync(data, {
      secret: process.env.JWT_SECRET,
      expiresIn: 60 * 60 * 8,
    });

    return { access_token: accessToken };
  }
  async generateRefreshToken(
    payload: UserEntity,
  ): Promise<{ refresh_token: string }> {
    const data = { sub: payload.id, email: payload.email };

    const refreshToken = await this.jwtService.signAsync(data, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: 60 * 60 * 24 * 30,
    });

    return { refresh_token: refreshToken };
  }
}

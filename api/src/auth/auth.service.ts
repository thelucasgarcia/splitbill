import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from 'src/app/dto/auth/login.dto';
import { RegisterAuthDto } from 'src/app/dto/auth/register.dto';
import { UserEntity } from 'src/app/entities/user.entity';
import { AuthRepository } from 'src/app/repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserEntity) {
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
      }),
    };
  }

  async validateUser(param: LoginAuthDto) {
    return await this.authRepository.login(param);
  }

  async register(param: RegisterAuthDto) {
    const user = await this.authRepository.register(param);
    return await this.login(user);
  }
}

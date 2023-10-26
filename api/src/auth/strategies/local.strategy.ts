import { ConflictException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthExceptionEnum } from 'src/lib/enums/auth.exception.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new ConflictException({
        code: 'INVALID_EMAIL_PASSWORD',
        message: AuthExceptionEnum.INVALID_EMAIL_PASSWORD,
      });
    }

    return user;
  }
}

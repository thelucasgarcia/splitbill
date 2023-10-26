import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthExceptionEnum } from 'src/lib/enums/auth.exception.enum';

export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw new UnauthorizedException({
        code: 'NOT_AUTHENTICATED',
        message: AuthExceptionEnum.NOT_AUTHENTICATED,
      });
    }
    return user;
  }
}

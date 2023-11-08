import { ErrorException } from 'src/app/errors/error-exception';
import { ErrorMessage } from 'src/app/errors/error-message';

export class AuthInvalidRefreshTokenException extends ErrorException {
  constructor(error?: Error) {
    super(ErrorMessage.REFRESH_TOKEN_INVALID, error);
  }
}

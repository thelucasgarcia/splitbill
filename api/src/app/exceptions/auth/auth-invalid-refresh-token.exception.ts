import { ErrorException } from 'src/app/errors/error-exception';
import { ErrorMessage } from 'src/app/errors/error-message';

export class AuthNotAuthenticatedException extends ErrorException {
  constructor(error?: Error) {
    super(ErrorMessage.NOT_AUTHENTICATED, error);
  }
}

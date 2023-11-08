import { ErrorException } from 'src/app/errors/error-exception';
import { ErrorMessage } from 'src/app/errors/error-message';

export class AuthInvalidEmailOrPasswordException extends ErrorException {
  constructor(error?: Error) {
    super(ErrorMessage.INVALID_EMAIL_PASSWORD, error);
  }
}

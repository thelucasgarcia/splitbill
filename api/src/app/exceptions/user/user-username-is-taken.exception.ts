import { ErrorException } from 'src/app/errors/error-exception';
import { ErrorMessage } from 'src/app/errors/error-message';

export class UserUsernameIsTakenException extends ErrorException {
  constructor(error?: Error) {
    super(ErrorMessage.USERNAME_IS_TAKEN, error);
  }
}

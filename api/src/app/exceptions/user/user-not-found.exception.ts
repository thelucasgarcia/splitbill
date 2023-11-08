import { ErrorException } from 'src/app/errors/error-exception';
import { ErrorMessage } from 'src/app/errors/error-message';

export class UserNotFoundException extends ErrorException {
  constructor(error?: Error) {
    super(ErrorMessage.USER_NOT_FOUND, error);
  }
}

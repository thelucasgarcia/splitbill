import { ErrorException } from 'src/app/errors/error-exception';
import { ErrorMessage } from 'src/app/errors/error-message';

export class UserPhoneIsTakenException extends ErrorException {
  constructor(error?: Error) {
    super(ErrorMessage.PHONE_IS_TAKEN, error);
  }
}

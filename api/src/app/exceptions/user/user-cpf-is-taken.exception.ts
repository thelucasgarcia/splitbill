import { ErrorException } from 'src/app/errors/error-exception';
import { ErrorMessage } from 'src/app/errors/error-message';

export class UserCpfIsTakenException extends ErrorException {
  constructor(error?: Error) {
    super(ErrorMessage.CPF_IS_TAKEN, error);
  }
}

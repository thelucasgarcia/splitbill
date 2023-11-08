import { ErrorException } from 'src/app/errors/error-exception';
import { ErrorMessage } from 'src/app/errors/error-message';

export class BillNotFoundException extends ErrorException {
  constructor(error?: Error) {
    super(ErrorMessage.BILL_NOT_FOUND, error);
  }
}

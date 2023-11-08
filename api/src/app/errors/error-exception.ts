import { HttpException } from '@nestjs/common';
import { ErrorMessage } from './error-message';

export class ErrorException extends HttpException {
  constructor(
    response: ErrorMessage = ErrorMessage.INTERNAL_SERVER_ERROR,
    error?: Error,
    description?: string,
  ) {
    const { code, message, status } = response;
    super({ code, message }, status, { cause: error, description });
  }
}

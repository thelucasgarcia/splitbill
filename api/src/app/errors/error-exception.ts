import { HttpException, Logger } from '@nestjs/common';
import { ErrorMessage } from './error-message';

export class ErrorException extends HttpException {
  constructor(
    response: ErrorMessage = ErrorMessage.INTERNAL_SERVER_ERROR,
    error?: Error,
    description?: string,
  ) {
    const { code, message, status } = response;
    super({ code, message }, status, { cause: error, description });
    this.init(code, message);
  }

  init(code: string, message: string) {
    const logger = new Logger();
    logger.error(
      `HANDLE_EXCEPTION: [${this.getStatus()}] ${code} - ${message}`,
      this.stack,
      this.cause,
    );
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from 'src/app/errors/error-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let details = 'Internal server Error';
    let code = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      code = exception.name;
      status = exception.getStatus();
      details = exception.message;

      const cause = exception.getResponse();
      if (typeof cause === 'object') {
        if ('code' in cause) {
          code = cause['code'] as string;
        }
        if ('message' in cause) {
          details = cause['message'] as string;
        }
      }
    }

    return response
      .status(status)
      .json(new ErrorResponse(code, status, details));
  }
}

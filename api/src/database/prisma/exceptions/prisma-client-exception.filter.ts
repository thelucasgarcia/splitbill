import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { ErrorResponse } from 'src/app/errors/error-response';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    switch (exception.code) {
      case 'P1000': {
        status = HttpStatus.UNAUTHORIZED;
        break;
      }
      case 'P2002': {
        status = HttpStatus.CONFLICT;
        break;
      }
      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }

    return response
      .status(status)
      .json(
        new ErrorResponse(
          exception.code,
          status,
          exception.meta.cause as string,
          message,
        ),
      );
  }
}

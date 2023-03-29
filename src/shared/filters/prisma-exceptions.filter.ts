import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host?.switchToHttp();
    const response = ctx?.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Bad Request';

    switch (exception.code) {
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        error = 'Conflict';
        break;
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        error = 'Not Found';
        break;
    }

    response.status(statusCode).json({ statusCode, error });
  }
}

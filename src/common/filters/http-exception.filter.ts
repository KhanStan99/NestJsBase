import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const message =
      exception instanceof HttpException
        ? exception.getResponse()['message']
        : MESSAGES.UNKNOWN_EXCEPTION_MESSAGE;
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(
      {
        statusCode,
        message,
        path: request.url,
      },
      exception.stack,
    );

    response.status(statusCode).send({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      stack:
        process.env.NODE_ENV === 'development' ? exception.stack : undefined,
    });
  }
}

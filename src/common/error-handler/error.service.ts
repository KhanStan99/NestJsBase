import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  handle(e: any): void {
    let errorCode = 500;
    let errorInfo = 'Internal Error';
    if (e.response) {
      errorCode = e.status;
      errorInfo = e.response;
    } else if (e.response && e.statusCode) {
      errorCode = e.statusCode;
      errorInfo = e.message;
    }
    throw new HttpException(errorInfo, errorCode);
  }
}

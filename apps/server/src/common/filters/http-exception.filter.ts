import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from '../exceptions/custom.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let errorCode: string;
    let message: string;

    if (exception instanceof CustomException) {
      status = exception.getStatus();
      errorCode = exception.errorCode;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorCode = status === 400 ? 'RQ01' : 'SV01';

      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseMessage = (
          exceptionResponse as { message?: string | string[] }
        ).message;
        if (Array.isArray(responseMessage)) {
          message = responseMessage.join(', ');
        } else if (typeof responseMessage === 'string') {
          message = responseMessage;
        } else {
          message = exception.message;
        }
      } else {
        message = exception.message;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorCode = 'SV01';
      message = '서버 내부 오류가 발생했습니다.';
    }

    const errorResponse = {
      success: false,
      errorCode,
      message,
      timestamp: new Date().toISOString(),
      statusCode: status,
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}

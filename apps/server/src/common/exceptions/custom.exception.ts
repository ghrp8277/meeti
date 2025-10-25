import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES, ErrorCode } from '../constants/error-codes';

export class CustomException extends HttpException {
  public readonly errorCode: string;

  constructor(
    errorCode: ErrorCode,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    const message = ERROR_CODES[errorCode];
    super(message, status);
    this.errorCode = errorCode;
  }
}

export class BadRequestException extends CustomException {
  constructor(errorCode: ErrorCode = 'RQ01') {
    super(errorCode, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends CustomException {
  constructor(errorCode: ErrorCode = 'AU04') {
    super(errorCode, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends CustomException {
  constructor(errorCode: ErrorCode = 'AU05') {
    super(errorCode, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends CustomException {
  constructor(errorCode: ErrorCode = 'RS01') {
    super(errorCode, HttpStatus.NOT_FOUND);
  }
}

export class ConflictException extends CustomException {
  constructor(errorCode: ErrorCode = 'RS02') {
    super(errorCode, HttpStatus.CONFLICT);
  }
}

export class InternalServerErrorException extends CustomException {
  constructor(errorCode: ErrorCode = 'SV01') {
    super(errorCode, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

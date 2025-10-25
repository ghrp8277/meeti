import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

interface ApiDocsOptions {
  summary: string;
  description?: string;
  responses?: {
    status: number;
    description: string;
    schema?: Record<string, unknown>;
  }[];
}

export function ApiDocs(options: ApiDocsOptions) {
  const decorators = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    }),
  ];

  if (options.responses) {
    options.responses.forEach((response) => {
      decorators.push(
        ApiResponse({
          status: response.status,
          description: response.description,
          schema: response.schema,
        }),
      );
    });
  } else {
    decorators.push(
      ApiResponse({
        status: 200,
        description: '성공',
      }),
    );
  }

  return applyDecorators(...decorators);
}

export function ApiDocsSuccess(schema?: Record<string, unknown>) {
  return ApiResponse({
    status: 200,
    description: '성공',
    schema,
  });
}

export function ApiDocsBadRequest() {
  return ApiResponse({
    status: 400,
    description: '잘못된 요청',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: '잘못된 요청입니다' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  });
}

export function ApiDocsUnauthorized() {
  return ApiResponse({
    status: 401,
    description: '인증 실패',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: '인증이 필요합니다' },
        error: { type: 'string', example: 'Unauthorized' },
      },
    },
  });
}

export function ApiDocsNotFound() {
  return ApiResponse({
    status: 404,
    description: '리소스를 찾을 수 없음',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: '리소스를 찾을 수 없습니다' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  });
}

export function ApiDocsInternalServerError() {
  return ApiResponse({
    status: 500,
    description: '서버 내부 오류',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: '서버 내부 오류가 발생했습니다' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  });
}

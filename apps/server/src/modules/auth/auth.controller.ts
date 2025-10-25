import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PhoneVerificationService } from './services/phone-verification.service';
import { JwtAuthService } from './services/jwt.service';
import { SendVerificationDto, VerifyCodeDto, LoginDto } from './dto';
import { ApiDocs, User, UserPayload, Public } from '../../common/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly phoneVerificationService: PhoneVerificationService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post('send-verification')
  @Public()
  @ApiDocs({
    summary: '휴대폰 인증번호 발송',
    description: '휴대폰 번호로 인증번호를 발송합니다',
    responses: [
      {
        status: 200,
        description: '인증번호 발송 성공',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: '인증번호가 발송되었습니다.' },
          },
        },
      },
      {
        status: 400,
        description: '잘못된 요청',
      },
    ],
  })
  async sendVerification(@Body() sendVerificationDto: SendVerificationDto) {
    return this.phoneVerificationService.sendVerificationCode(
      sendVerificationDto.phoneNumber,
    );
  }

  @Post('verify-code')
  @Public()
  @ApiDocs({
    summary: '인증번호 확인',
    description: '발송된 인증번호를 확인합니다',
    responses: [
      {
        status: 200,
        description: '인증 성공',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: '인증이 완료되었습니다.' },
          },
        },
      },
      {
        status: 400,
        description: '잘못된 요청',
      },
    ],
  })
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.phoneVerificationService.verifyCode(
      verifyCodeDto.phoneNumber,
      verifyCodeDto.code,
    );
  }

  @Post('login')
  @Public()
  @ApiDocs({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다',
    responses: [
      {
        status: 200,
        description: '로그인 성공',
        schema: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            tokenType: { type: 'string', example: 'Bearer' },
            expiresIn: { type: 'number', example: 3600 },
          },
        },
      },
      {
        status: 401,
        description: '인증 실패',
      },
    ],
  })
  async login(@Body() loginDto: LoginDto) {
    return this.jwtAuthService.login(loginDto);
  }

  @Post('logout')
  @ApiDocs({
    summary: '로그아웃',
    description: '현재 사용자를 로그아웃합니다',
    responses: [
      {
        status: 200,
        description: '로그아웃 성공',
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: '로그아웃이 완료되었습니다.' },
          },
        },
      },
      {
        status: 401,
        description: '인증이 필요합니다',
      },
    ],
  })
  async logout(@User() user: UserPayload) {
    return this.jwtAuthService.logout(user.id);
  }
}

import { Controller, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { CreateUserDto, ChangePasswordDto } from './dto';
import { ApiDocs } from '../../common/decorators';
import { ApiResponseSchema, ErrorResponseSchema } from '../../common/schemas';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 409,
    description: '이미 존재하는 사용자',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '회원가입',
    description: '새로운 사용자를 등록합니다.',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.service.createUser(createUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: '회원탈퇴 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '사용자를 찾을 수 없음 (US01)',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '회원탈퇴',
    description: '사용자 계정을 삭제합니다.',
  })
  async deleteUser(@Param('id') id: string) {
    await this.service.deleteUser(id);
    return { message: '회원탈퇴가 완료되었습니다.' };
  }

  @Put(':id/password')
  @ApiResponse({
    status: 200,
    description: '비밀번호 변경 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 400,
    description: '현재 비밀번호가 일치하지 않음 (AU03)',
    type: ErrorResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '사용자를 찾을 수 없음 (US01)',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '비밀번호 변경',
    description: '사용자의 비밀번호를 변경합니다.',
  })
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    await this.service.changePassword(id, changePasswordDto);
    return { message: '비밀번호가 성공적으로 변경되었습니다.' };
  }
}

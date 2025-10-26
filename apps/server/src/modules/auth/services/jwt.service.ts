import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dto';
import { UnauthorizedException } from '../../../common/exceptions/custom.exception';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('AU04');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload);
    const decoded = this.jwtService.decode(accessToken) as any;

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: decoded.exp - decoded.iat,
    };
  }

  async logout(userId: string): Promise<{ message: string }> {
    return { message: '로그아웃이 완료되었습니다.' };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.userService.verifyPassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}

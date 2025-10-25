import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { BadRequestException } from '../../../common/exceptions/custom.exception';
import { randomBytes } from 'crypto';

@Injectable()
export class PhoneVerificationService {
  constructor(private readonly redisService: RedisService) {}

  async sendVerificationCode(phoneNumber: string): Promise<void> {
    const existingKey = `verification:${phoneNumber}`;
    const existingCode = await this.redisService.get(existingKey);

    if (existingCode) {
      throw new BadRequestException('AU01');
    }

    const verificationCode = this.generateVerificationCode();
    const key = `verification:${phoneNumber}`;

    await this.redisService.setWithExpiry(key, verificationCode, 300);
  }

  async verifyCode(phoneNumber: string, code: string): Promise<void> {
    const key = `verification:${phoneNumber}`;
    const storedCode = await this.redisService.get(key);

    if (!storedCode) {
      throw new BadRequestException('AU02');
    }

    if (storedCode !== code) {
      throw new BadRequestException('AU03');
    }

    await this.redisService.del(key);
  }

  private generateVerificationCode(): string {
    const randomBytesBuffer = randomBytes(3);
    const randomNumber = randomBytesBuffer.readUIntBE(0, 3);
    return (100000 + (randomNumber % 900000)).toString();
  }
}

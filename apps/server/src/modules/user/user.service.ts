import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto, ChangePasswordDto } from './dto';
import { User } from '../../entities/user.entity';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '../../common/exceptions/custom.exception';
import { ProfileService } from '../profile/profile.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly repository: UserRepository,
    private readonly profileService: ProfileService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name, birthDate, phoneNumber, gender } =
      createUserDto;

    const existingUserByEmail = await this.repository.findOne({
      where: { email },
    });
    if (existingUserByEmail) {
      throw new ConflictException('US02');
    }

    if (phoneNumber) {
      const existingUserByPhone = await this.repository.findOne({
        where: { mobile: phoneNumber },
      });
      if (existingUserByPhone) {
        throw new ConflictException('US02');
      }
    }

    const userData: Partial<User> = {
      email,
      password: await this.hashPassword(password),
      name,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      mobile: phoneNumber,
      gender,
    };

    const user = await this.repository.create(userData);

    await this.profileService.create(user.id);

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('US01');
    }

    await this.repository.delete(id);
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.repository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('US01');
    }

    const isCurrentPasswordValid = await this.verifyPassword(
      currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('AU03');
    }

    const hashedNewPassword = await this.hashPassword(newPassword);
    await this.repository.update(userId, { password: hashedNewPassword });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

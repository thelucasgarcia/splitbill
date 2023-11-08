import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginAuthDto } from 'src/app/dto/auth/login.dto';
import { RegisterAuthDto } from 'src/app/dto/auth/register.dto';
import { UserEntity } from 'src/app/entities/user.entity';
import { AuthRepository } from 'src/app/repositories/auth.repository';
import { AuthInvalidEmailOrPasswordException } from 'src/app/exceptions/auth/auth-invalid-email-password.exception';
import { UserEmailIsTakenException } from 'src/app/exceptions/user/user-email-is-taken.exception';
import { UserUsernameIsTakenException } from 'src/app/exceptions/user/user-username-is-taken.exception';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async login(param: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: param.email },
    });

    if (!user) {
      throw new AuthInvalidEmailOrPasswordException();
    }

    const validatePassword = bcrypt.compareSync(
      param?.password,
      user?.password,
    );

    if (!validatePassword) {
      throw new AuthInvalidEmailOrPasswordException();
    }

    return PrismaUserMapper.toDomain(user);
  }

  async register(user: RegisterAuthDto) {
    const createdUser = await this.prisma.$transaction(async (ctx) => {
      const hasEmail = await ctx.user.findUnique({
        where: { email: user.email },
      });

      if (hasEmail) {
        throw new UserEmailIsTakenException();
      }

      const hasUsername = await ctx.user.findUnique({
        where: { username: user.username },
      });

      if (hasUsername) {
        throw new UserUsernameIsTakenException();
      }

      return await ctx.user.create({
        data: PrismaUserMapper.toPrisma(new UserEntity(user)),
      });
    });

    return PrismaUserMapper.toDomain(createdUser);
  }
}

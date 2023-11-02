import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginAuthDto } from 'src/app/dto/auth/login.dto';
import { RegisterAuthDto } from 'src/app/dto/auth/register.dto';
import { UserEntity } from 'src/app/entities/user.entity';
import { AuthRepository } from 'src/app/repositories/auth.repository';
import { AuthExceptionEnum } from 'src/lib/exceptions/auth.exception.enum';
import { UserExceptionEnum } from 'src/lib/exceptions/user.exception.enum';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async login(param: LoginAuthDto): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: param.email },
    });

    if (!user) {
      throw new BadRequestException({
        code: 'INVALID_EMAIL_PASSWORD',
        message: AuthExceptionEnum.INVALID_EMAIL_PASSWORD,
      });
    }

    const validatePassword = bcrypt.compareSync(
      param?.password,
      user?.password,
    );

    if (!validatePassword) {
      throw new BadRequestException({
        code: 'INVALID_EMAIL_PASSWORD',
        message: AuthExceptionEnum.INVALID_EMAIL_PASSWORD,
      });
    }

    return PrismaUserMapper.toDomain(user);
  }

  async register(user: RegisterAuthDto): Promise<UserEntity> {
    const createdUser = await this.prisma.$transaction(async (ctx) => {
      const hasEmail = await ctx.user.findUnique({
        where: { email: user.email },
      });

      if (hasEmail) {
        throw new ConflictException({
          code: 'EMAIL_IS_TAKEN',
          message: UserExceptionEnum.EMAIL_IS_TAKEN,
        });
      }

      const hasUsername = await ctx.user.findUnique({
        where: { username: user.username },
      });

      if (hasUsername) {
        throw new ConflictException({
          code: 'USERNAME_IS_TAKEN',
          message: UserExceptionEnum.USERNAME_IS_TAKEN,
        });
      }

      return await ctx.user.create({
        data: PrismaUserMapper.toPrisma(new UserEntity(user)),
      });
    });

    return PrismaUserMapper.toDomain(createdUser);
  }
}

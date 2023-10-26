import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/app/dto/user/create-user.dto';
import { UserEntity } from 'src/app/entities/user.entity';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { UserExceptionEnum } from 'src/lib/enums/user.exception.enum';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';
import { EditUserDto } from 'src/app/dto/user/edit-user.dto';
@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map(PrismaUserMapper.toDomain);
  }

  async validUsername(username: string): Promise<boolean> {
    const user = await this.prisma.user.count({
      where: { username: username.toLowerCase() },
    });
    return !Boolean(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException({
        code: 'USER_NOT_FOUND',
        message: UserExceptionEnum.USER_NOT_FOUND,
      });
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.prisma.$transaction(async (ctx) => {
      const hasEmail = await ctx.user.findUnique({
        where: { email: user.email },
      });

      if (hasEmail) {
        throw new UnprocessableEntityException({
          code: 'EMAIL_IS_TAKEN',
          message: UserExceptionEnum.EMAIL_IS_TAKEN,
        });
      }

      const hasUsername = await ctx.user.findUnique({
        where: { username: user.username },
      });

      if (hasUsername) {
        throw new UnprocessableEntityException({
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

  async update(id: UserEntity['id'], user: EditUserDto): Promise<UserEntity> {
    const updatedUser = await this.prisma.$transaction(async (ctx) => {
      const currentUser = await ctx.user.findUnique({ where: { id: id } });

      if (!currentUser) {
        throw new NotFoundException({
          code: 'USER_NOT_FOUND',
          message: UserExceptionEnum.USER_NOT_FOUND,
        });
      }

      const editUser: EditUserDto = {
        name: user.name || currentUser.name,
        cpf: currentUser?.cpf || user?.cpf,
        phone: currentUser?.phone || user?.phone,
      };

      if (editUser.phone) {
        const hasPhone = await ctx.user.findUnique({
          where: {
            phone: editUser.phone,
            NOT: {
              id: id,
            },
          },
        });

        if (hasPhone) {
          throw new UnprocessableEntityException({
            code: 'PHONE_IS_TAKEN',
            message: UserExceptionEnum.PHONE_IS_TAKEN,
          });
        }
      }

      if (editUser.cpf) {
        const hasCpf = await ctx.user.findUnique({
          where: {
            cpf: editUser.cpf,
            NOT: {
              id: id,
            },
          },
        });

        if (hasCpf) {
          throw new UnprocessableEntityException({
            code: 'CPF_IS_TAKEN',
            message: UserExceptionEnum.CPF_IS_TAKEN,
          });
        }
      }

      return await ctx.user.update({
        where: { id: id },
        data: PrismaUserMapper.toPrisma(new UserEntity(editUser, id)),
      });
    });

    return PrismaUserMapper.toDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

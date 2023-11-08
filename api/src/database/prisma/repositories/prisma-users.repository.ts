import { Injectable } from '@nestjs/common';
import { AttemptRegisterDto } from 'src/app/dto/auth/attempt.dto';
import { CreateUserDto } from 'src/app/dto/user/create-user.dto';
import { EditUserDto } from 'src/app/dto/user/edit-user.dto';
import { UserEntity } from 'src/app/entities/user.entity';
import { UserCpfIsTakenException } from 'src/app/exceptions/user/user-cpf-is-taken.exception';
import { UserEmailIsTakenException } from 'src/app/exceptions/user/user-email-is-taken.exception';
import { UserNotFoundException } from 'src/app/exceptions/user/user-not-found.exception';
import { UserPhoneIsTakenException } from 'src/app/exceptions/user/user-phone-is-taken.exception';
import { UserUsernameIsTakenException } from 'src/app/exceptions/user/user-username-is-taken.exception';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';
@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(PrismaUserMapper.toDomain);
  }

  async attempt(data: AttemptRegisterDto) {
    const result = {
      email: true,
      username: true,
      cpf: true,
      phone: true,
    };

    if (data.email) {
      result['email'] = Boolean(
        await this.prisma.user.count({ where: { email: data.email } }),
      );
    }

    if (data.username) {
      result['username'] = Boolean(
        await this.prisma.user.count({ where: { username: data.username } }),
      );
    }

    if (data.cpf) {
      result['cpf'] = Boolean(
        await this.prisma.user.count({ where: { cpf: data.cpf } }),
      );
    }

    if (data.phone) {
      result['phone'] = Boolean(
        await this.prisma.user.count({ where: { phone: data.phone } }),
      );
    }

    return result;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    return PrismaUserMapper.toDomain(user);
  }

  async create(user: CreateUserDto) {
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

  async update(id: UserEntity['id'], user: EditUserDto) {
    const updatedUser = await this.prisma.$transaction(async (ctx) => {
      const currentUser = await ctx.user.findUnique({ where: { id: id } });

      if (!currentUser) {
        throw new UserNotFoundException();
      }

      const editUser: EditUserDto = {
        name: user.name || currentUser.name,
        cpf: currentUser?.cpf || user?.cpf,
        phone: currentUser?.phone || user?.phone,
        picture: currentUser?.picture || user?.picture,
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
          throw new UserPhoneIsTakenException();
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
          throw new UserCpfIsTakenException();
        }
      }

      return await ctx.user.update({
        where: { id: id },
        data: PrismaUserMapper.toPrisma(new UserEntity(editUser, id)),
      });
    });

    return PrismaUserMapper.toDomain(updatedUser);
  }

  async delete(id: string) {
    const user = await this.findById(id);
    await this.prisma.user.delete({ where: { id: user.id } });
  }
}

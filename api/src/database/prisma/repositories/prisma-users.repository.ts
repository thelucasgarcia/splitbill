import { Injectable } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { UserEntity } from 'src/app/entities/user.entity';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map(PrismaUserMapper.toDomain);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({ data: user });
    throw new UnauthorizedException();
    return new UserEntity(createdUser);
  }

  async update(id: string, user: UserEntity): Promise<UserEntity | null> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });
    return new UserEntity(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

import { User as RawUser, User } from '@prisma/client';
import { UserEntity } from 'src/app/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { removeSpecialCaracters } from 'src/lib/helpers/removeSpecialCaracters';
export class PrismaUserMapper {
  static toPrisma(user: UserEntity): User {
    return {
      id: user?.id,
      name: user?.name,
      password: user?.password && bcrypt.hashSync(user?.password, 10),
      username: user?.username,
      email: user?.email,
      cpf: removeSpecialCaracters(user?.cpf),
      phone: removeSpecialCaracters(user?.phone),
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
      deletedAt: user?.deletedAt,
    };
  }

  static toDomain(data: RawUser): UserEntity {
    return new UserEntity(data, data.id);
  }
}

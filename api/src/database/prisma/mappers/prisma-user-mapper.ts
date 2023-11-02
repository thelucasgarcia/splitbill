import { User as RawUser } from '@prisma/client';
import { UserEntity } from 'src/app/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { removeSpecialCaracters } from 'src/lib/helpers/removeSpecialCaracters';
export class PrismaUserMapper {
  static toPrisma(data: UserEntity): RawUser {
    return {
      id: data?.id,
      name: data?.name,
      picture: data?.picture,
      password: data?.password && bcrypt.hashSync(data?.password, 10),
      username: data?.username,
      email: data?.email,
      cpf: removeSpecialCaracters(data?.cpf),
      phone: removeSpecialCaracters(data?.phone),
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      deletedAt: data?.deletedAt,
    };
  }

  static toDomain(data: RawUser): UserEntity {
    return new UserEntity(data, data.id);
  }
}

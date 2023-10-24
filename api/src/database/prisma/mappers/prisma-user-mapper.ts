import { User as RawUser } from '@prisma/client';
import { UserEntity } from 'src/app/entities/user.entity';

export class PrismaUserMapper {
  static toPrisma(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static toDomain(data: RawUser): UserEntity {
    return new UserEntity(
      {
        name: data.name,
        email: data.email,
      },
      data.id,
    );
  }
}

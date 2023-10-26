import { UserEntity } from 'src/app/entities/user.entity';

export class UserViewModel {
  static toHTTP(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

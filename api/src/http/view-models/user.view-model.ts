import { UserEntity } from 'src/app/entities/user.entity';

export class UserViewModel {
  static toHTTP(data: UserEntity) {
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

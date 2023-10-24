import { UserEntity } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findAll(): Promise<UserEntity[]>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract update(id: string, user: UserEntity): Promise<UserEntity | null>;
  abstract delete(id: string): Promise<void>;
}

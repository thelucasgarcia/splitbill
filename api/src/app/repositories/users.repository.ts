import { CreateUserDto } from '../dto/user/create-user.dto';
import { EditUserDto } from '../dto/user/edit-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findAll(): Promise<UserEntity[]>;
  abstract validUsername(username: UserEntity['username']): Promise<boolean>;
  abstract findById(id: UserEntity['id']): Promise<UserEntity | null>;
  abstract create(user: CreateUserDto): Promise<UserEntity>;
  abstract update(id: UserEntity['id'], user: EditUserDto): Promise<UserEntity>;
  abstract delete(id: UserEntity['id']): Promise<void>;
}

import { AttemptRegisterDto } from '../dto/auth/attempt.dto';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { EditUserDto } from '../dto/user/edit-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface AttemptResponse {
  email: boolean;
  username: boolean;
  cpf: boolean;
  phone: boolean;
}
export abstract class UsersRepository {
  abstract findAll(): Promise<UserEntity[]>;
  abstract attempt(fields: AttemptRegisterDto): Promise<AttemptResponse>;
  abstract findById(id: UserEntity['id']): Promise<UserEntity | null>;
  abstract create(user: CreateUserDto): Promise<UserEntity>;
  abstract update(id: UserEntity['id'], user: EditUserDto): Promise<UserEntity>;
  abstract delete(id: UserEntity['id']): Promise<void>;
}

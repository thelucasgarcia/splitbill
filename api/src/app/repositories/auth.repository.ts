import { LoginAuthDto } from '../dto/auth/login.dto';
import { RegisterAuthDto } from '../dto/auth/register.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  abstract login(param: LoginAuthDto): Promise<UserEntity | null>;
  abstract register(param: RegisterAuthDto): Promise<UserEntity>;
}

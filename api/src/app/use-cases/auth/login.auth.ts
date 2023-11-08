import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from 'src/app/dto/auth/login.dto';
import { AuthRepository } from 'src/app/repositories/auth.repository';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class LoginAuth {
  constructor(private repository: AuthRepository) {}

  async execute(data: LoginAuthDto): Promise<UserEntity> {
    return await this.repository.login(data);
  }
}

import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from 'src/app/dto/auth/register.dto';
import { AuthRepository } from 'src/app/repositories/auth.repository';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class RegisterAuth {
  constructor(private repository: AuthRepository) {}

  async execute(data: RegisterAuthDto): Promise<UserEntity> {
    return await this.repository.register(data);
  }
}

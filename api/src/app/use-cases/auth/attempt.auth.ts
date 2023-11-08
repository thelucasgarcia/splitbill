import { Injectable } from '@nestjs/common';
import { AttemptRegisterDto } from 'src/app/dto/auth/attempt.dto';
import { UsersRepository } from 'src/app/repositories/users.repository';

@Injectable()
export class AttemptRegister {
  constructor(private repository: UsersRepository) {}

  async execute(data: AttemptRegisterDto) {
    return await this.repository.attempt(data);
  }
}

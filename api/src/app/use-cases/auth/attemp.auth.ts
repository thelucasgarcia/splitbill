import { Injectable } from '@nestjs/common';
import { ValidUsernameParamDto } from 'src/app/dto/user/valid-username.dto';
import { UsersRepository } from 'src/app/repositories/users.repository';

@Injectable()
export class ValidUsername {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ username }: ValidUsernameParamDto): Promise<boolean> {
    return await this.usersRepository.validUsername(username);
  }
}

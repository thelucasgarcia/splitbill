import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class GetAllUsers {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<UserEntity[]> {
    return await this.usersRepository.findAll();
  }
}

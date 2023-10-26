import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(user: CreateUserDto): Promise<UserEntity> {
    return await this.usersRepository.create(user);
  }
}

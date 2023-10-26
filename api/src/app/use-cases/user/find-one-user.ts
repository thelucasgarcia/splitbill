import { Injectable } from '@nestjs/common';
import { FindOneUserParamDto } from 'src/app/dto/user/find-one-param.dto';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class FindOneUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: FindOneUserParamDto): Promise<UserEntity> {
    return await this.usersRepository.findById(id);
  }
}

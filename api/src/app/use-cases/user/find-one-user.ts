import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { UserEntity } from '../../entities/user.entity';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';

@Injectable()
export class FindOneUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: FindOneParamDto): Promise<UserEntity> {
    return await this.usersRepository.findById(id);
  }
}

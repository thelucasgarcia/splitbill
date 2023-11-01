import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { EditUserDto } from '../../dto/user/edit-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';

@Injectable()
export class EditUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    { id }: FindOneParamDto,
    user: EditUserDto,
  ): Promise<UserEntity> {
    return await this.usersRepository.update(id, user);
  }
}

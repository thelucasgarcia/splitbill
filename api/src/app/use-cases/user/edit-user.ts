import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { EditUserDto, EditUserParamDto } from '../../dto/user/edit-user.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class EditUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    { id }: EditUserParamDto,
    user: EditUserDto,
  ): Promise<UserEntity> {
    return await this.usersRepository.update(id, user);
  }
}

import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

interface GetAllUsersResponse {
  data: UserEntity[];
  total: number;
}

@Injectable()
export class GetAllUsers {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersResponse> {
    const data = await this.usersRepository.findAll();

    // throw new HttpException("Erro 404", 404);
    return {
      data,
      total: data.length,
    };
  }
}

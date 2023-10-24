import { UserViewModel } from './../../view-models/user-view-model';
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllUsers } from 'src/app/use-cases/get-all-users';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly getAllUsers: GetAllUsers) {}

  @Get()
  async getUsers() {
    const { data, total } = await this.getAllUsers.execute();

    return {
      data: data.map(UserViewModel.toHTTP),
      total,
    };
  }
}

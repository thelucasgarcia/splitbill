import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { CreateUserDto } from 'src/app/dto/user/create-user.dto';
import { EditUserDto } from 'src/app/dto/user/edit-user.dto';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { EditUser } from 'src/app/use-cases/user/edit-user';
import { FindOneUser } from 'src/app/use-cases/user/find-one-user';
import { GetAllUsers } from 'src/app/use-cases/user/get-all-users';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { UserViewModel } from '../../view-models/user.view-model';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly useGetAllUsers: GetAllUsers,
    private readonly useFindOneUser: FindOneUser,
    private readonly useCreateUser: CreateUser,
    private readonly useEditUser: EditUser,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const response = await this.useCreateUser.execute(body);
    return UserViewModel.toHTTP(response);
  }

  @Get()
  async findAll() {
    const response = await this.useGetAllUsers.execute();
    return response.map(UserViewModel.toHTTP);
  }

  @Get(':id')
  async findOne(@Param() param: FindOneParamDto) {
    const response = await this.useFindOneUser.execute(param);
    return UserViewModel.toHTTP(response);
  }

  @Patch(':id')
  async update(@Param() param: FindOneParamDto, @Body() body: EditUserDto) {
    const response = await this.useEditUser.execute(param, body);
    return UserViewModel.toHTTP(response);
  }
}

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/app/dto/user/create-user.dto';
import { EditUserDto, EditUserParamDto } from 'src/app/dto/user/edit-user.dto';
import { FindOneUserParamDto } from 'src/app/dto/user/find-one-param.dto';
import { ValidUsernameParamDto } from 'src/app/dto/user/valid-username.dto';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { EditUser } from 'src/app/use-cases/user/edit-user';
import { FindOneUser } from 'src/app/use-cases/user/find-one-user';
import { GetAllUsers } from 'src/app/use-cases/user/get-all-users';
import { ValidUsername } from 'src/app/use-cases/user/valid-username';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { UserViewModel } from '../../view-models/user.view-model';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('v1/user')
export class UserController {
  constructor(
    private readonly useGetAllUsers: GetAllUsers,
    private readonly useFindOneUser: FindOneUser,
    private readonly useValidUsername: ValidUsername,
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

  @Get('attemp')
  async validUsername(@Query() query: ValidUsernameParamDto) {
    if (query.username) {
      return await this.useValidUsername.execute(query);
    }
    throw new NotFoundException();
  }

  @Get(':id')
  async findOne(@Param() param: FindOneUserParamDto) {
    const response = await this.useFindOneUser.execute(param);
    return UserViewModel.toHTTP(response);
  }

  @Patch(':id')
  async update(@Param() param: EditUserParamDto, @Body() body: EditUserDto) {
    const response = await this.useEditUser.execute(param, body);
    return UserViewModel.toHTTP(response);
  }
}

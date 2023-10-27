import { Test, TestingModule } from '.pnpm/@nestjs+testing@10.0.0_@nestjs+common@10.0.0_@nestjs+core@10.0.0_@nestjs+platform-express@10.0.0/node_modules/@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

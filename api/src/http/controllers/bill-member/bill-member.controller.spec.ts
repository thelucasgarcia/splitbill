import { Test, TestingModule } from '@nestjs/testing';
import { BillMemberController } from './bill-member.controller';

describe('BillMemberController', () => {
  let controller: BillMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillMemberController],
    }).compile();

    controller = module.get<BillMemberController>(BillMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BillItemController } from './bill-item.controller';

describe('BillItemController', () => {
  let controller: BillItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillItemController],
    }).compile();

    controller = module.get<BillItemController>(BillItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

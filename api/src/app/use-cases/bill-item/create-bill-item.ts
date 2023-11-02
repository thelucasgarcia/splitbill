import { Injectable } from '@nestjs/common';
import { CreateBillItemDto } from 'src/app/dto/bill-item/create-bill-item.dto';
import { BillItemEntity } from 'src/app/entities/bill-item.entity';
import { BillItemRepository } from 'src/app/repositories/bill-item.repository';

@Injectable()
export class CreateBillItem {
  constructor(private repository: BillItemRepository) {}

  async execute(data: CreateBillItemDto): Promise<BillItemEntity> {
    return await this.repository.create(data);
  }
}

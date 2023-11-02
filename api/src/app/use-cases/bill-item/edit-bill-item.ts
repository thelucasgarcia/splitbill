import { Injectable } from '@nestjs/common';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { EditBillItemDto } from 'src/app/dto/bill-item/edit-bill-item.dto';
import { BillItemEntity } from 'src/app/entities/bill-item.entity';
import { BillItemRepository } from 'src/app/repositories/bill-item.repository';

@Injectable()
export class EditBillItem {
  constructor(private repository: BillItemRepository) {}

  async execute(
    param: FindOneParamDto,
    data: EditBillItemDto,
  ): Promise<BillItemEntity> {
    return await this.repository.update(param, data);
  }
}

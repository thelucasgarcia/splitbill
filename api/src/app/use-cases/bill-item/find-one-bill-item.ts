import { Injectable } from '@nestjs/common';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { BillItemEntity } from 'src/app/entities/bill-item.entity';
import { BillItemRepository } from 'src/app/repositories/bill-item.repository';

@Injectable()
export class FindOneBillItem {
  constructor(private repository: BillItemRepository) {}

  async execute({ id }: FindOneParamDto): Promise<BillItemEntity> {
    return await this.repository.findById(id);
  }
}

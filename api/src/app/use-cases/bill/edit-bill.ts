import { Injectable } from '@nestjs/common';
import { EditBillDto } from 'src/app/dto/bill/edit-bill.dto';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { BillEntity } from 'src/app/entities/bill.entity';
import { BillRepository } from 'src/app/repositories/bill.repository';

@Injectable()
export class EditBill {
  constructor(private repository: BillRepository) {}

  async execute(
    param: FindOneParamDto,
    body: EditBillDto,
  ): Promise<BillEntity> {
    return await this.repository.update(param, body);
  }
}

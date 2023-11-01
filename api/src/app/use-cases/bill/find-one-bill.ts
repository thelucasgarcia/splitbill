import { Injectable } from '@nestjs/common';
import { FindOneParamDto } from 'src/app/dto/common/find-one-param.dto';
import { BillEntity } from 'src/app/entities/bill.entity';
import { BillRepository } from 'src/app/repositories/bill.repository';

@Injectable()
export class FindOneBill {
  constructor(private billsRepository: BillRepository) {}

  async execute({ id }: FindOneParamDto): Promise<BillEntity> {
    return await this.billsRepository.findById(id);
  }
}

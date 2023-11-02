import { Injectable } from '@nestjs/common';
import { BillEntity } from 'src/app/entities/bill.entity';
import { BillRepository } from 'src/app/repositories/bill.repository';

@Injectable()
export class GetAllBills {
  constructor(private repository: BillRepository) {}

  async execute(): Promise<BillEntity[]> {
    return await this.repository.findAll();
  }
}

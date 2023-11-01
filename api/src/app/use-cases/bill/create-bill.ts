import { Injectable } from '@nestjs/common';
import { CreateBillDto } from 'src/app/dto/bill/create-bill.dto';
import { BillEntity } from 'src/app/entities/bill.entity';
import { BillRepository } from 'src/app/repositories/bill.repository';

@Injectable()
export class CreateBill {
  constructor(private billrepository: BillRepository) {}

  async execute(data: CreateBillDto, userId: string): Promise<BillEntity> {
    return await this.billrepository.create(data, userId);
  }
}

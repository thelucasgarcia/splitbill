import { CreateBillDto } from '../dto/bill/create-bill.dto';
import { EditBillDto } from '../dto/bill/edit-bill.dto';
import { FindOneParamDto } from '../dto/common/find-one-param.dto';
import { BillEntity } from '../entities/bill.entity';
import { UserEntity } from '../entities/user.entity';

export abstract class BillRepository {
  abstract findAll(): Promise<BillEntity[]>;
  abstract findById(id: BillEntity['id']): Promise<BillEntity | null>;
  abstract create(
    data: CreateBillDto,
    userId: UserEntity['id'],
  ): Promise<BillEntity>;
  abstract update(
    id: FindOneParamDto,
    editBill: EditBillDto,
  ): Promise<BillEntity>;
  abstract delete(id: BillEntity['id']): Promise<BillEntity>;
}

import { FindOneParamDto } from '../dto/common/find-one-param.dto';
import { CreateBillItemDto } from '../dto/bill-item/create-bill-item.dto';
import { EditBillItemDto } from '../dto/bill-item/edit-bill-item.dto';
import { BillItemEntity } from '../entities/bill-item.entity';

export abstract class BillItemRepository {
  abstract findAll(): Promise<BillItemEntity[]>;
  abstract findById(id: BillItemEntity['id']): Promise<BillItemEntity | null>;
  abstract create(data: CreateBillItemDto): Promise<BillItemEntity>;
  abstract update(
    id: FindOneParamDto,
    editBill: EditBillItemDto,
  ): Promise<BillItemEntity>;
  abstract delete(id: BillItemEntity['id']): Promise<BillItemEntity>;
}

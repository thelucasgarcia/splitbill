import { BillItemEntity } from 'src/app/entities/bill-item.entity';

export class BillItemViewModel {
  static toHTTP(data: BillItemEntity) {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      billId: data.billId,
      bill: data.bill,
      type: data.type,
      members: data.members,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

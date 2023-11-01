import { BillEntity } from 'src/app/entities/bill.entity';

export class BillViewModel {
  static toHTTP(data: BillEntity) {
    console.log(data.userId);
    return {
      id: data.id,
      name: data.name,
      user: data.user,
      userId: data.userId,
      tag: data.tag,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

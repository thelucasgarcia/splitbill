import { BillEntity } from 'src/app/entities/bill.entity';

export class BillViewModel {
  static toHTTP(data: BillEntity) {
    return {
      id: data.id,
      name: data.name,
      user: data.user,
      userId: data.userId,
      total: data.total,
      items: data.items,
      members: data.members,
      description: data.description,
      editValues: data.editValues,
      inviteMembers: data.inviteMembers,
      tag: data.tag,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}

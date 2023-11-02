import { randomUUID } from 'crypto';
import { BillEntity } from './bill.entity';
import { UserEntity } from './user.entity';

export interface BillMemberProps {
  id?: string;
  billId?: BillEntity['id'];
  memberId?: UserEntity['id'];

  bill?: BillEntity;
  member?: UserEntity;
}

export class BillMemberEntity {
  private _id: string;
  private props: BillMemberProps;

  constructor(props: BillMemberProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get billId(): string {
    return this.props.billId;
  }

  public set billId(value: string) {
    this.props.billId = value;
  }

  public get memberId(): string {
    return this.props.memberId;
  }

  public set memberId(value: string) {
    this.props.memberId = value;
  }

  public get bill(): BillEntity {
    return this.props.bill;
  }

  public set bill(value: BillEntity) {
    this.props.bill = value;
  }

  public get member(): UserEntity {
    return this.props.member;
  }

  public set member(value: UserEntity) {
    this.props.member = value;
  }
}

import { randomUUID } from 'crypto';
import { BillItemEntity } from './bill-item.entity';
import { BillMemberEntity } from './bill-member.entity';

export interface BillMemberItemProps {
  id?: string;
  itemId?: string;
  item?: BillItemEntity;
  memberId?: string;
  member?: BillMemberEntity;
  percentage?: number;
}

export class BillMemberItemEntity {
  private _id: string;
  private props: BillMemberItemProps;

  constructor(props: BillMemberItemProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get itemId(): string {
    return this.props.itemId;
  }
  public set itemId(value: string) {
    this.props.itemId = value;
  }

  public get item(): BillItemEntity {
    return this.props.item;
  }

  public set item(value: BillItemEntity) {
    this.props.item = value;
  }

  public get memberId(): string {
    return this.props.memberId;
  }

  public set memberId(value: string) {
    this.props.memberId = value;
  }

  public get member(): BillMemberEntity {
    return this.props.member;
  }

  public set member(value: BillMemberEntity) {
    this.props.member = value;
  }

  public get percentage(): number {
    return this.props.percentage;
  }

  public set percentage(value: number) {
    this.props.percentage = value;
  }
}

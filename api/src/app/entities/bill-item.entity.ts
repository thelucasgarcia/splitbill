import { randomUUID } from 'crypto';
import { BillMemberItemEntity } from './bill-member-item.entity';
import { BillEntity } from './bill.entity';

export enum BillType {
  PERCENTAGE = 'PERCENTAGE',
  EQUALLY = 'EQUALLY',
  VALUE = 'VALUE',
  AMOUNT = 'AMOUNT',
}
export interface BillItemProps {
  id?: string;
  billId?: string;
  bill?: BillEntity;
  name?: string;
  quantity?: number;
  price?: number;
  type?: BillType;
  total?: number;
  members?: BillMemberItemEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class BillItemEntity {
  private _id: string;
  private props: BillItemProps;

  constructor(props: BillItemProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get type(): BillType {
    return this.props.type;
  }

  public set type(value: BillType) {
    this.props.type = value;
  }

  public get billId(): string {
    return this.props.billId;
  }
  public set billId(value: string) {
    this.props.billId = value;
  }

  public get bill(): BillEntity {
    return this.props.bill;
  }

  public set bill(value: BillEntity) {
    this.props.bill = value;
  }

  public get quantity(): number {
    return this.props.quantity;
  }
  public set quantity(value: number) {
    this.props.quantity = value;
  }

  public get price(): number {
    return this.props.price;
  }
  public set price(value: number) {
    this.props.price = value;
  }

  public get total(): number {
    return this.props.price * this.props.quantity;
  }

  public get members(): BillMemberItemEntity[] {
    return this.props.members;
  }

  public set members(value: BillMemberItemEntity[]) {
    this.props.members = value;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

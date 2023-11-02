import { randomUUID } from 'crypto';
import { BillEntity } from './bill.entity';

export interface BillItemProps {
  id?: string;
  billId?: string;
  bill?: BillEntity;
  name?: string;
  quantity?: number;
  price?: number;
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

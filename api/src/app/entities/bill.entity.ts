import { Bill } from '@prisma/client';
import { randomUUID } from 'crypto';

export interface BillProps {
  id: string;
  name: string;
  tag: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class BillEntity {
  private _id: string;
  private props: Bill;

  constructor(props: BillProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set tag(tag: string[]) {
    this.props.tag = tag;
  }

  public get tag(): string[] {
    return this.props.tag;
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

  public set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
  }

  public get deletedAt(): Date {
    return this.props.deletedAt;
  }
}

import { randomUUID } from 'crypto';
import { UserEntity } from './user.entity';
import { BillItemEntity } from './bill-item.entity';
import { BillMemberEntity } from './bill-member.entity';

export interface BillProps {
  id?: string;
  name?: string;
  tag?: string[];
  description?: string;
  editValues?: boolean;
  inviteMembers?: boolean;
  userId?: string;
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  user?: UserEntity;
  items?: BillItemEntity[];
  members?: BillMemberEntity[];
}

export class BillEntity {
  private _id: string;
  private props: BillProps;

  constructor(props: BillProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get user(): UserEntity {
    return this.props.user;
  }

  public set user(user: UserEntity) {
    this.props.user = user;
  }

  public get items() {
    return this.props.items;
  }

  public set items(value: BillItemEntity[]) {
    this.props.items = value;
  }

  public get members(): BillMemberEntity[] {
    return this.props.members;
  }

  public set members(value: BillMemberEntity[]) {
    this.props.members = value;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(value: string) {
    this.props.description = value;
  }

  public get editValues(): boolean {
    return this.props.editValues;
  }

  public set editValues(value: boolean) {
    this.props.editValues = value;
  }

  public get inviteMembers(): boolean {
    return this.props.inviteMembers;
  }
  public set inviteMembers(value: boolean) {
    this.props.inviteMembers = value;
  }

  public set tag(tag: string[]) {
    this.props.tag = tag;
  }

  public get tag(): string[] {
    return this.props.tag;
  }

  public get total(): number {
    const items = this.items || [];
    return items.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
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

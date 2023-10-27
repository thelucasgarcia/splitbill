import { randomUUID } from 'crypto';
import { BillEntity } from './bill.entity';

export interface BillSettingsProps {
  id: string;
  billId: string;
  description: string;
  editValues: boolean;
  inviteMembers: boolean;
  bill: BillEntity;
}

export class BillSettingsEntity {
  private _id: string;
  private props: BillSettingsProps;

  constructor(props: BillSettingsProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set editValues(editValues: boolean) {
    this.props.editValues = editValues;
  }

  public get editValues(): boolean {
    return this.props.editValues;
  }

  public set inviteMembers(inviteMembers: boolean) {
    this.props.inviteMembers = inviteMembers;
  }

  public get inviteMembers(): boolean {
    return this.props.inviteMembers;
  }

  public set billId(billId: string) {
    this.props.billId = billId;
  }

  public get billId(): string {
    return this.props.billId;
  }
}

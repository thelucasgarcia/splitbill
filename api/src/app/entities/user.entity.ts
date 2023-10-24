import { randomUUID } from 'crypto';

export interface UserProps {
  name: string;
  email: string;
}

export class UserEntity {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
    };
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

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }
}

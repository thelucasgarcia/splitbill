import { randomUUID } from 'crypto';

export interface UserProps {
  name?: string;
  email?: string;
  picture?: string;
  password?: string;
  username?: string;
  cpf?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class UserEntity {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
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

  public get picture(): string {
    return this.props.picture;
  }

  public set picture(value: string) {
    this.props.picture = value;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get username(): string {
    return this.props.username;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string {
    return this.props.phone;
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

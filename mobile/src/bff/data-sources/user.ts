import { BaseApi } from '../base-api';
import { QueryGetOneUserArgs, UserResponse } from '../schemas/user';
export class User extends BaseApi {
  override baseURL = 'https://splitbill-one.vercel.app/v1/users'

  getAllUsers() {
    return this.get<UserResponse[]>(`/`)
  }

  getOneUser({ id }: QueryGetOneUserArgs) {
    return this.get<UserResponse>(`/${id}`)
  }
}
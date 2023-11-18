import { BaseApi } from '../base-api';
import { QueryGetOneUserArgs, UserResponse } from '../schemas/user';
export class User extends BaseApi {
  override baseURL = 'https://jsonplaceholder.typicode.com'

  getAllUsers(params: QueryGetOneUserArgs) {
    return this.get<UserResponse[]>(`/users`)
  }

  getOneUsers({ id }: QueryGetOneUserArgs) {
    return this.get<UserResponse>(`/users/${id}`)
  }
}
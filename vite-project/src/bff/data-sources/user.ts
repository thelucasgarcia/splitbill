import { RestApi } from '../rest-api';
import { QueryGetOneUserArgs, UserRequest, UserResponse } from '../schemas/user';
export class User extends RestApi {
  override baseURL = 'https://jsonplaceholder.typicode.com'

  getAllUsers() {
    return this.get<UserResponse>(`/users`).catch(res => alert(res.message))
  }

  getOneUsers({ id }: QueryGetOneUserArgs) {
    return this.get<UserResponse>(`/users/${id}`)
  }

  getAllPosts() {
    return this.get(`/posts`)
  }

  createUser() {
    return this.post<UserRequest, UserResponse>('/user')
  }
}
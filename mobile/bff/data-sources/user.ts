import { RestApi } from '../rest-api';
import { PostsResponse } from '../schemas/posts';
import { QueryGetOneUserArgs, UserRequest, UserResponse } from '../schemas/user';
export class User extends RestApi {
  override baseURL = 'https://jsonplaceholder.typicode.com'

  getAllUsers(params: QueryGetOneUserArgs) {
    return this.get<UserResponse[]>(`/users`)
  }

  getOneUsers({ id }: QueryGetOneUserArgs) {
    return this.get<UserResponse>(`/users/${id}`)
  }

  getAllPosts() {
    return this.get<PostsResponse[]>(`/posts`)
  }

  createUser() {
    return this.post<UserRequest, UserResponse>('/user')
  }
}
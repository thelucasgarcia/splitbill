import { BaseApi } from '../base-api';
import { UserRequest } from '../schemas/user';

export class UserService extends BaseApi {
  override baseURL = 'https://jsonplaceholder.typicode.com'

  getAllUsers() {
    return this.query(`/users`)
  }


  getAllPosts() {
    return this.query(`/posts`)
  }

  createUser() {
    return this.mutation<UserRequest>('/', 'post')
  }
}
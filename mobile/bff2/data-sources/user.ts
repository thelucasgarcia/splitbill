import { BaseApi } from '../base-api';

export class UserService extends BaseApi {
  override baseURL = 'https://jsonplaceholder.typicode.com'

  getAllUsers() {
    return this.query(`/users`)
  }


  getAllPosts() {
    return this.query(`/posts`)
  }

  createUser() {
    return this.mutation('/', 'post')
  }
}
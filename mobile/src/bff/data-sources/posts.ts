import { BaseApi } from '../base-api';
import { PostCreateInput, PostsResponse } from '../schemas/posts';

export class Posts extends BaseApi {
  override baseURL = 'https://jsonplaceholder.typicode.com/posts'

  getAllPosts() {
    return this.get<PostsResponse[]>(`/`)
  }

  createPost(data: PostCreateInput) {
    return this.post<PostsResponse, PostCreateInput>('/', data )
  }
}
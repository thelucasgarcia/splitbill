import { dataSources } from '../data-sources'

export interface PostsResponse {
  userId: number,
  id: number
  title: string
  body: string
}

export interface PostCreateInput {
  title: string,
  body: string,
  userId: 1
}

export const resolvers = {
  Query: {
    getPosts: () => dataSources.post.getAllPosts()
  },
  Mutation: {
    createPost: (data: PostCreateInput) => dataSources.post.createPost(data)
  },
}
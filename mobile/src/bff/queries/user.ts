
import { buildMutationHook, buildQueryHook } from '../buildHook'
import resolvers from '../schemas'

export const useUsers = buildQueryHook(['getUsers'], resolvers.user.Query.getUsers)
export const useCreatePost = buildMutationHook(['createPost'], resolvers.post.Mutation.createPost)
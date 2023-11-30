
import resolvers from '../schemas'
import { buildMutationHook, buildQueryHook } from '../buildHook'

export const useUsers = buildQueryHook('getUsers', resolvers.user.Query.getUsers)
export const useUser = buildQueryHook('getUser', resolvers.user.Query.getUser)
export const useCreatePost = buildMutationHook('createPost', resolvers.post.Mutation.createPost)
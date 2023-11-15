import { resolvers } from '../schemas/user'

export const useUsers = resolvers.Query.getUsers
export const usePosts = resolvers.Query.getPosts
export const useCreateUser = resolvers.Mutation.createUser
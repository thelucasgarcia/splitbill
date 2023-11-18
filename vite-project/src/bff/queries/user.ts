
import { buildMutationHook, buildQueryHook } from '../buildHook'
import { dataSources } from '../data-sources'
import { QueryGetOneUserArgs } from '../schemas/user'

export const useUsers = () => buildQueryHook(['getUsers'], () => dataSources.user.getAllUsers())
export const useUser = (params: QueryGetOneUserArgs) => buildQueryHook(['getOneUser'], () => dataSources.user.getOneUsers(params))
export const usePosts = () => buildQueryHook(['getAllPosts'], () => dataSources.user.getAllPosts())
export const useCreateUser = () => buildMutationHook(['createUser'], () => dataSources.user.createUser())
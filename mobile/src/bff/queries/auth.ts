
import { buildMutationHook } from '../buildHook'
import resolvers from '../schemas'

export const useSignIn = buildMutationHook(['signIn'], resolvers.auth.Mutation.signIn)
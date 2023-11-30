import { buildMutationHook } from '../buildHook'
import resolvers from '../schemas'

export const useSignIn = buildMutationHook('signIn', resolvers.auth.Mutation.signIn)
export const useSignUp = buildMutationHook('signUp', resolvers.auth.Mutation.signUp)
export const useAuthAttempt = buildMutationHook('attempt', resolvers.auth.Mutation.attempt)
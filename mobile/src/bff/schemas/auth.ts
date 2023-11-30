import { dataSources } from '../data-sources'

export interface QueryGetOneUserArgs {
  id: string
}

export interface AuthSignInRequest {
  email: string,
  password: string
}

export interface AuthTokenResponse {
  access_token: string,
  refresh_token: string
}

export interface AttemptRequest {
  username?: string
  email?: string
  phone?: string
  cpf?: string
}
export interface AttemptResponse {
  username: boolean
}

export interface AuthSignUpRequest {
  name: string,
  username: string,
  email: string,
  password: string
}

export const resolvers = {
  Query: { 
  },
  Mutation: {
    signIn: (params: AuthSignInRequest) => dataSources.auth.signIn(params),
    signUp: (params: AuthSignUpRequest) => dataSources.auth.signUp(params),
    attempt: (params: AttemptRequest) => dataSources.auth.attempt(params)
  },
}

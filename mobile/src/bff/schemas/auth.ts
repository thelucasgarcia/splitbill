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


export const resolvers = {
  Query: {
    
  },
  Mutation: {
    signIn: (params: AuthSignInRequest) => dataSources.auth.signIn(params),
  },
}

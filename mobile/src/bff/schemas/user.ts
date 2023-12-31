import { dataSources } from '../data-sources'

export interface QueryGetOneUserArgs {
  id: string
}

export interface UserResponse {
  id: string
  name: string
  picture: string | null
  username: string
  email: string
  cpf: string | null
  phone: string | null
  createdAt: string
  updatedAt: string
}


export interface UserRequest {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

interface Geo {
  lat: string
  lng: string
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export const resolvers = {
  Query: {
    getUsers: () => dataSources.user.getAllUsers(),
    getUser: (params: QueryGetOneUserArgs) => dataSources.user.getOneUser(params)
  },
  Mutation: {},
}

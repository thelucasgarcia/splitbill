import { dataSources } from '../data-sources';

export interface UserResponse {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
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
    getUsers: () => dataSources.users.getAllUsers(),
    getPosts: () => dataSources.users.getAllPosts()
  },
  Mutation: {
    createUser: () => dataSources.users.createUser()
  }
}
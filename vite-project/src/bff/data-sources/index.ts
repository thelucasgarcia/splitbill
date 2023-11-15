import { UserService } from './user';

export const dataSources = {
  users: new UserService()
}

export interface DataSourceProps {
  cache: any
  context: any
}

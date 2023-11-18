import { Posts } from './posts';
import { User } from './user';

export const dataSources = {
  user: new User(),
  post: new Posts()
}
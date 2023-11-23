import { Auth } from './auth';
import { Bill } from './bills';
import { Posts } from './posts';
import { User } from './user';

export const dataSources = {
  auth: new Auth(),
  user: new User(),
  post: new Posts(),
  bill: new Bill(),
}
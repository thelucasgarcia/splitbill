import { resolvers as userResolver } from './user'
import { resolvers as postResolver } from './posts'
import { resolvers as authResolver } from './auth'
import { resolvers as billResolver } from './bill'

const resolvers = {
  auth: authResolver,
  user: userResolver,
  post: postResolver,
  bill: billResolver
}

export default resolvers
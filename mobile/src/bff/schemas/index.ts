import { resolvers as userResolver } from './user'
import { resolvers as postResolver } from './posts'

const resolvers = {
  user: userResolver,
  post: postResolver
}

export default resolvers
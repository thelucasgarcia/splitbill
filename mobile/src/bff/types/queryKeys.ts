import { Resolvers } from '../schemas';

type QueryMutationTuple<T extends keyof Resolvers> = {
  Query: keyof Resolvers[T]['Query'];
  Mutation: keyof Resolvers[T]['Mutation'];
};
type AllCategories = keyof Resolvers;
type AllMutationTuples = {[Category in AllCategories]: QueryMutationTuple<Category>['Mutation']}[AllCategories];
type AllQueryTuples = {[Category in AllCategories]: QueryMutationTuple<Category>['Query']}[AllCategories];

export type QueryKeyType = AllMutationTuples | AllQueryTuples
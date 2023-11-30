import { queryClient } from '@/config/query-client';
import { InvalidateQueryFilters, MutationFunction, QueryKey, UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { QueryKeyType } from './types/queryKeys';


function buildQueryHook<TArgs = unknown, TData = unknown>(queryKey: QueryKeyType, queryFn: (args: TArgs) => Promise<TData>) {
  return (variables?: TArgs, options?: UseQueryOptions<TData>) => useQuery({
    queryKey: variables ? [queryKey, variables] : [queryKey],
    queryFn: () => queryFn(variables as TArgs),
    ...options,
  })
}

interface PageParam {
  nextCursor: number,
  prevCursor: number
}

function buildInfiniteQueryHook<TArgs = unknown, TData extends PageParam = any>(queryKey: QueryKey, queryFn: (args: TArgs) => Promise<TData>) {
  return (variables: TArgs, options?: UseInfiniteQueryOptions<TData>) => useInfiniteQuery({
    queryKey: variables ? [queryKey, variables] : [queryKey],
    queryFn: ({ pageParam }) => queryFn({ ...variables, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  })
}

function buildMutationHook<TData, TVariables>(queryKey: QueryKeyType, mutationFn?: MutationFunction<TData, TVariables>) {
  return (options?: UseMutationOptions<TData, AxiosError | Error, TVariables>) => {
    const mutation = useMutation<TData, AxiosError | Error, TVariables>({
      mutationKey: [queryKey],
      mutationFn: mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [queryKey]
        });
      },
      ...options
    });

    return {
      ...mutation,
      invalidate: (...args: Array<InvalidateQueryFilters>) => {
        const queryKeys = args.map((key) => queryClient.invalidateQueries(key))
        return Promise.all(queryKeys)
      },
      cancelQueries: (keys: QueryKeyType[]) => {
        return queryClient.cancelQueries({ queryKey: keys }, { silent: true})
      },
    }
  }
}

export { buildQueryHook, buildInfiniteQueryHook, buildMutationHook };

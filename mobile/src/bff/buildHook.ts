import { queryClient } from '@/config/query-client';
import { InvalidateQueryFilters, MutationFunction, QueryKey, UseInfiniteQueryOptions, UseQueryOptions, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

function useBuildQueryHook<TArgs = unknown, TData = unknown>(queryKey: QueryKey, queryFn: (args: TArgs) => Promise<TData>) {
  return (variables: TArgs, options?: UseQueryOptions<TData>) => useQuery({
    queryKey: [queryKey, variables],
    queryFn: () => queryFn(variables),
    ...options,
  })
}

interface PageParam {
  nextCursor: number,
  prevCursor: number
}

function useBuildInfiniteQueryHook<TArgs = unknown, TData extends PageParam = any>(queryKey: QueryKey, queryFn: (args: TArgs) => Promise<TData>) {
  return (variables: TArgs, options?: UseInfiniteQueryOptions<TData>) => useInfiniteQuery({
    queryKey: variables ? [queryKey, variables] : [queryKey],
    queryFn: ({ pageParam }) => queryFn({ ...variables, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  })
}

function useBuildMutationHook<TData, TVariables>(queryKey: QueryKey, mutationFn?: MutationFunction<TData, TVariables>) {
  return () => {
    const mutation = useMutation<TData, AxiosError | Error, TVariables>({
      mutationFn: mutationFn,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey
        });
      },
    });

    return {
      ...mutation,
      invalidate: (...args: Array<InvalidateQueryFilters>) => {
        const queryKeys = args.map((key) => queryClient.invalidateQueries(key))
        return Promise.all(queryKeys)
      },
    }
  }
}

export { useBuildInfiniteQueryHook as buildInfiniteQueryHook, useBuildMutationHook as buildMutationHook, useBuildQueryHook as buildQueryHook };


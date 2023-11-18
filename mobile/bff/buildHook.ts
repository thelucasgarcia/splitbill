import { MutationFunction, QueryKey, UseInfiniteQueryOptions, UseQueryOptions, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryClient } from '../app/_layout';

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
    queryKey: [queryKey, variables],
    queryFn: ({ pageParam }) => queryFn({...variables, page: pageParam}),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  })
}

function useBuildMutationHook<TData>(queryKey: QueryKey, mutationFn?: MutationFunction<TData, TData>) {
  return useMutation<TData, AxiosError | Error, TData>({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey
      });
    },
  });
}

export { useBuildInfiniteQueryHook as buildInfiniteQueryHook, useBuildMutationHook as buildMutationHook, useBuildQueryHook as buildQueryHook };


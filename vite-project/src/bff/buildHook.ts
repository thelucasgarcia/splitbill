import { MutationFunction, QueryFunction, QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryClient } from '../main';

function useBuildQueryHook<TData>(queryKey: QueryKey, queryFn?: QueryFunction<TData, QueryKey, never>) {
    return useQuery<TData, AxiosError | Error>({
      queryKey,
      queryFn
    });
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

export { useBuildQueryHook as buildMutationHook , useBuildMutationHook as buildQueryHook };

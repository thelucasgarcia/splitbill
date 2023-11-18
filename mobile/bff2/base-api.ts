import { QueryClient, QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { RestApi } from './rest.api';

export class BaseApi extends RestApi{
  private queryClient: ReturnType<typeof useQueryClient> = new QueryClient();
  
  protected query<TData>(url: string, config?: AxiosRequestConfig) {
    return useQuery<TData>({
      queryKey: [url], 
      queryFn: () => this.get<TData>(url, config)
    });
  }

  protected mutation<TData>(url: string, method: 'post' | 'put' | 'delete' | 'patch' = 'post', config?: AxiosRequestConfig) {
    return useMutation<TData, AxiosError | Error, TData>({
      mutationFn: (data) => this[method](url, data, config),
      onSuccess: () => {
        this.queryClient.invalidateQueries({
          queryKey: [url]
        });
      },
    });
  }
}
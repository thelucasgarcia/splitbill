import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true
    }
  }
})

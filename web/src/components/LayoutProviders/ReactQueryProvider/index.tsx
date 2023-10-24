import queryClient from '@/lib/config/react-query';
import { PropsWithChildren } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position='bottom-right'/>
    </QueryClientProvider>
  );
}
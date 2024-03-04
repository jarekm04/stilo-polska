import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 6000, gcTime: 10 * (60 * 1000) } } });

export const AppProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 6000, gcTime: 10 * (60 * 1000) } } });

export const AppProvider = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* `reducedMotion="user"` wycina ruch (transform) w całym drzewie Framer Motion,
          gdy system prosi o ograniczenie animacji – przenikanie zostaje. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </QueryClientProvider>
  );
};

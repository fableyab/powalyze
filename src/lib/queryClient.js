
import { QueryClient } from '@tanstack/react-query';

// Configure the React Query client with aggressive caching for performance
// but sensible stale times to ensure data freshness where it matters.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // Cache persists for 30 minutes
      refetchOnWindowFocus: false, // Prevent jarring refetches on tab switch
      retry: 1, // Retry failed requests once
      suspense: true, // Enable React Suspense for loading states
    },
  },
});

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotificationProvider from './Notification/NotificationProvider.context';
import { GithubProvider } from './GithubConnect';

// Importa otros contextos aquí
interface CombinedProviderProps {
  children: ReactNode;
}
// Query client
const queryClient = new QueryClient();

const CombinedProvider: React.FC<CombinedProviderProps> = ({ children }) => {
  return (
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <GithubProvider>
          {children}
        </GithubProvider>
      </QueryClientProvider>
    </NotificationProvider>
  );
};

export default CombinedProvider;

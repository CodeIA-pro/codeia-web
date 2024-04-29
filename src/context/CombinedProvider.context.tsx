import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotificationProvider from './Notification/NotificationProvider.context';
import { GithubProvider } from './GithubConnect';
import { GithubBranchProvider } from './GithubBranch';
import { GenerateGuideProvider } from './GenerateGuide';

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
        <GithubBranchProvider> 
          <GithubProvider>
            <GenerateGuideProvider>
              {children}
            </GenerateGuideProvider>
          </GithubProvider>
        </GithubBranchProvider>
      </QueryClientProvider>
    </NotificationProvider>
  );
};

export default CombinedProvider;

import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { getAuthorizationHeaders } from "../utils/authorization";
import { API_URL } from "../services";
import { Branches } from "../interfaces/github/branches.interface";

interface GithubBranchType {
    mutate: (repo: string, owner: string) => Promise<Branches>;
    data: Branches | null;
    error: string | null;
    reset: () => void;
    isLoading: boolean;
}

export const GithubBranchContext = createContext<GithubBranchType>({} as GithubBranchType);

interface GithubBranchProps {
    children: ReactNode;
  }

  export const GithubBranchProvider: React.FC<GithubBranchProps> = ({ children }) => {
    const [data, setData] = useState<Branches | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const mutate = async (repo: string, owner: string) => {
      setIsLoading(true);
      setData(null);
      setError(null);
      try {
        const headers = getAuthorizationHeaders();
        const response = await axios.get(API_URL + 'project/get/github/branches/' + repo + '/owner/' +owner + '/', { headers });
        setData(response.data);
        return response.data;
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
      return { status: 'error' };
    };

    const reset = () => {
        setData(null);
        setError(null);
        setIsLoading(false);
    }

    return (
      <GithubBranchContext.Provider value={{reset,  mutate, error, data, isLoading }}>
        {children}
      </GithubBranchContext.Provider>
    );
  };
  
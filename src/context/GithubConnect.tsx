import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { getAuthorizationHeaders } from "../utils/authorization";
import { API_URL } from "../services";
import { Connect } from "../interfaces/github/connect.interface";

interface GithubConnectType {
    connect: (code: string) => Promise<Connect>;
    error: string | null;
    isLoading: boolean;
}

export const GithubContext = createContext<GithubConnectType>({} as GithubConnectType);

interface GithubConnectProps {
    children: ReactNode;
  }

  export const GithubProvider: React.FC<GithubConnectProps> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const connect = async (code: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const headers = getAuthorizationHeaders();
        const response = await axios.get(API_URL + 'project/connection/' + code + '/', { headers });
        return response.data;
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
      return { status: 'error' };
    };

    return (
      <GithubContext.Provider value={{ connect, error, isLoading }}>
        {children}
      </GithubContext.Provider>
    );
  };
  
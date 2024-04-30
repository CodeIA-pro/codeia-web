import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { getAuthorizationHeaders } from "../utils/authorization";
import { API_URL } from "../services";
import { Connect } from "../interfaces/github/connect.interface";
import { useNotification } from "../hooks/useNotification";
import { useGenerateGuide } from "../queries/useProject";
import { GenerateReferenceGuide } from "../interfaces/project/projects.interface";
import { useQueryClient } from "@tanstack/react-query";

interface GenerateGuideType {
    mutate: (data: GenerateReferenceGuide) => Promise<Connect>;
    error: string | null;
    reset: () => void;
    isLoading: boolean;
}

export const GenerateGuideContext = createContext<GenerateGuideType>({} as GenerateGuideType);

interface GenerateGuideProps {
    children: ReactNode;
  }

  export const GenerateGuideProvider: React.FC<GenerateGuideProps> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {getSuccess, getWarning, getError} = useNotification();
    const {mutate: GenerateGuide} = useGenerateGuide();
    const queryClient = useQueryClient();
    
    const mutate = async (data: GenerateReferenceGuide) => {
      setIsLoading(true);
      setError(null);
      try {
        getWarning('This may take a moment, please wait...');
        const headers = getAuthorizationHeaders();
        await axios.get(API_URL + 'project/read-repo/'+ data.project_id +'/', { headers }).then(response => {
            if (response.data.status === 'success') {
                getSuccess('Confirming reference guides, this may take several minutes...');
                queryClient.invalidateQueries(['guide-project', data.project_name, data.owner]);
                GenerateGuide(data);
            }else {
                getError('Error getting information from github');
            }
        });
        
        return { status: 'success' };
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
      return { status: 'error' };
    };

    const reset = () => {
        setError(null);
        setIsLoading(false);
    }

    return (
      <GenerateGuideContext.Provider value={{reset,  mutate, error, isLoading }}>
        {children}
      </GenerateGuideContext.Provider>
    );
  };
  
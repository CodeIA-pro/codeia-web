import { useEffect, useState } from 'react';
import { useGithubConnect } from '../../queries/useGithub';

export const ConnectionWithGithub: React.FC = () => {
    const [code , setCode] = useState('');
    const {isLoading, refetch} = useGithubConnect(code);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get('code');
        console.log('urlParams', urlParams);
        if (codeParam && !isLoading) {
            setCode(codeParam);
            refetch();
        }
    },[isLoading, refetch, code]);

  return null; // Este componente no renderiza nada, solo contiene el efecto
};
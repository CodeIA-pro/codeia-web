import { useQuery } from "@tanstack/react-query";
import { githubConnect, githubProjects, githubStatus, githubUser } from "../api/github";
import { useAuthStore } from "../store";

export const useGithubUser = () => {
    const info = useQuery({
        queryKey: ['github-user'],
        queryFn: githubUser,
      });
    return info;
}
// 
export const useGithubConnect = (code: string, render: boolean=true) => {
  const { user, login } = useAuthStore();
  const info = useQuery({
    queryKey: ['github-connect'],
    queryFn: () => (code.trim() === '' ? { status: 'idle' } : githubConnect(code)),
    onSuccess: () => {
      if (user && code.trim() !== '') login(user, true);
    },
    enabled: render,
  });
  return info;
};

export const useGithubStatus = () => {
  const info = useQuery({
    queryKey: ['github-status'],
    queryFn: githubStatus,
  });
  return info;
}

export const useGithubProjects = () => {
    const info = useQuery({
        queryKey: ['github-projects'],
        queryFn: githubProjects,
        refetchInterval: 60000 * 5
        //refetchInterval: 60000 * 5, // Actualizar cada 60 segundos (1 minuto)
        //refetchOnWindowFocus: true, // Actualizar cuando el usuario vuelva a enfocar la ventana
      });
    return info;
}
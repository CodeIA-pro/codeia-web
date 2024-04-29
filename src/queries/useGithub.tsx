import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { githubBranches, githubConnect, githubProjectWithLanguage, githubProjects, githubStatus, githubUser } from "../api/github";
import { useAuthStore } from "../store";
import { GithubBraches } from "../interfaces/github/connect.interface";
import { CreateProjectGithub } from "../interfaces/project/projects.interface";
import { useNotification } from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";

export const useGithubUser = () => {
    const info = useQuery({
        queryKey: ['github-user'],
        queryFn: githubUser,
        refetchOnWindowFocus: false,
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
    refetchOnWindowFocus: false,
  });
  return info;
}

export const useGithubProjects = () => {
    const info = useQuery({
        queryKey: ['github-projects'],
        queryFn: githubProjects,
        refetchInterval: 60000 * 5,
        refetchOnWindowFocus: false,
        //refetchInterval: 60000 * 5, // Actualizar cada 60 segundos (1 minuto)
        //refetchOnWindowFocus: true, // Actualizar cuando el usuario vuelva a enfocar la ventana
      });
    return info;
}

export const useGithubBranches = () => {
    const info = useMutation({
      mutationFn: (data: GithubBraches) => githubBranches(data),
      onSuccess: (data) => {
        console.log(data);
      }
      },);
    return info;
}

export const useGithubProjectWithLanguages = () => {
  const {getSuccess, getError} = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
    const info = useMutation({
      mutationFn: (data: CreateProjectGithub) => githubProjectWithLanguage(data),
      onSuccess: (data) => {
        if (data.status){
          queryClient.invalidateQueries(['projects-repo']);
          queryClient.refetchQueries(['projects-repo']);
          navigate('/projects');
          getSuccess('Project created successfully');
        } 
        else if (data.message) getError(data.message);
        else getError('The project is not in the correct language');
        }
      });
    return info;
}
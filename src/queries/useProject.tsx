import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeProyect, createProject, generateReferenceGuide, projectByName, projectItem, projectsList, unlinkGithub, updateProject, verifyProjectName } from "../api/project";
import { useNotification } from "../hooks/useNotification";
import { sortDataDesc } from "../utils/filtered";
import { useNavigate } from "react-router-dom";
import { CreateProject } from "../interfaces/project/projects.interface";

export const useProjects = () => {
    const info = useQuery({
        queryKey: ['projects-repo'],
        queryFn: projectsList,
        select: (data) => {
          return sortDataDesc(data)
        },
      });
    return info;
}

export const useProjectItem = (name: string) => {
  const info = useQuery({
      queryKey: ['project-item', name],
      queryFn:() => projectItem(name),
    });
  return info;
}

export const useProjectName = (name: string) => {
  const info = useQuery({
      queryKey: ['project-data', name],
      queryFn:() => projectByName(name),
    });
  return info;
}

export const useVerifyNameProject = () => {
  const info = useMutation({
    mutationFn: (name: string) => {
      if (name.trim() === '') {
        return Promise.resolve(null);
      }
      return verifyProjectName(name);
    },
  });
  return info;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const {getSuccess, getError} = useNotification();
  const info = useMutation({
      mutationFn: createProject,
      onSuccess: () => {
        queryClient.invalidateQueries(['projects-repo']);
        getSuccess('Project created successfully');
      },
      onError: () => {
        getError('Error creating project');
      }
    });
  return info;
}


export const useUnlinkGithub = () => {
  const queryClient = useQueryClient();
  const {getSuccess, getError} = useNotification();
  const info = useMutation({
      mutationFn: unlinkGithub,
      onSuccess: () => {
        queryClient.resetQueries(['user']);
        getSuccess('Github unlinked successfully');
      },
      onError: () => {
        getError('Error unlinking github');
      }
    });
  return info;
}

export const useUpdateProject = (name: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {getSuccess, getError} = useNotification();
  const info = useMutation({
      mutationFn:(ob: CreateProject) => updateProject(ob),
      onSuccess: () => {
        queryClient.removeQueries(['project-data', name]);
        navigate('/projects');
        getSuccess('Project updated successfully');
      },
      onError: () => {
        getError('Error updating project');
      }
    });
  return info;
}

export const useChangeProject = () => {
  const navigate = useNavigate();
  const {getSuccess, getError} = useNotification();
  const info = useMutation({
      mutationFn: changeProyect,
      onSuccess: () => {
        navigate('/projects');
        getSuccess('Project changed successfully');
      },
      onError: () => {
        getError('Error changing project');
      }
    });
  return info;
}


export const useGenerateGuide = () => {
  const {getSuccess, getError} = useNotification();
  const info = useMutation({
      mutationFn: generateReferenceGuide,
      onSuccess: (data) => {
        if(data.status === 'success') {
          getSuccess('Reference guide generation has started');
        }else{
          getError('Error generating reference guide');
        }
      },
      onError: () => {
        getError('Error generating reference guide');	
      }
    });
  return info;
}
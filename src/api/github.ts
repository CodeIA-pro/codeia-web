import axios from "axios";
import { API_URL } from "../services";
import { UserGithub } from "../interfaces/github/user-github.interface";
import { ProjectGithub } from "../interfaces/github/projects-github.interface";
import { getAuthorizationHeaders } from "../utils/authorization";
import { Connect, GithubBraches } from "../interfaces/github/connect.interface";
import { Verify } from "../interfaces/common/verify.interface";
import { CreateProjectGithub, ResponseCreateProject } from "../interfaces/project/projects.interface";
import { Branches } from "../interfaces/github/branches.interface";

export const githubUser = async (): Promise<UserGithub> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'project/get/github/user/', { headers });
  return response.data.data;
};

export const githubProjects = async (): Promise<ProjectGithub> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'project/get/github/repo/', { headers });
  return response.data.data;
};

export const githubConnect = async (code: string): Promise<Connect> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'project/connection/' + code + '/', { headers });
  return response.data;
};

export const githubStatus = async (): Promise<Connect> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'project/status/', { headers });
  return response.data;
};

export const githubBranches = async (data: GithubBraches): Promise<Branches> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'project/get/github/branches/' + data.repo + '/owner/' + data.owner + '/', { headers });
  return response.data;
}

export const githubCreateProject = async (data: CreateProjectGithub): Promise<ResponseCreateProject> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'project/create/', data, { headers });
  return response.data;
}

export const githubAddProjectToRepository  = async (repo: number, project: number): Promise<CreateProjectGithub> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.put(API_URL + 'repository/add_project/repo/'+ repo +'/project/'+ project +'/', {}, { headers });
  return response.data;
}


export const githubProjectWithLanguage = async (data: CreateProjectGithub): Promise<Verify> => {
  const headers = getAuthorizationHeaders();
  try {
    const response =  await axios.get(API_URL + 'project/get/github/languages/' + data.title + '/owner/' + data.user_repo + '/', { headers });
    if(response.data.status==='success' && response.data.is_python_repo){
      const project = await githubCreateProject(data);
      await githubAddProjectToRepository(data.project_id, project.id);
      return {status: true};
    }
  } catch (error) {
    console.error(error);
    return {status: false, message: 'Error creating project'};	
  }

  return {status: false};
}
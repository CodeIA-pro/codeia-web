import axios from "axios";
import { API_URL } from "../services";
import { getAuthorizationHeaders } from "../utils/authorization";
import { ChangeProject, CreateProject, GenerateReferenceGuide, Project } from "../interfaces/project/projects.interface";
import { Verify } from "../interfaces/common/verify.interface";
import { ProjectItem } from "../interfaces/project/project-item.interface";
import { Connect } from "../interfaces/github/connect.interface";

export const projectsList = async (): Promise<Project> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'repository/', { headers });
  return response.data;
};

export const projectByName = async (name: string): Promise<Project> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'repository/name/'+ name +'/info/', { headers });
  return response.data[0];
};

export const projectItem = async (name: string): Promise<ProjectItem> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'repository/'+name+'/projects/', { headers });
  return response.data;
};

export const verifyProjectName = async (name: string): Promise<Verify> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.get(API_URL + 'repository/name/' + name + '/', { headers });
  return response.data;
};

export const createProject = async (data: CreateProject): Promise<CreateProject> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'repository/create/', data, { headers });
  return response.data;
};

export const updateProject = async (data: CreateProject): Promise<CreateProject> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.put(API_URL + 'repository/update/'+ data.id +'/', data, { headers });
  return response.data;
}

export const changeProyect = async (data: ChangeProject): Promise<CreateProject> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.put(API_URL + 'repository/change_project/repo/'+ data.repo_origin +'/change_repo/'+ data.repo_destiny +'/project/'+ data.project_id +'/', {}, { headers });
  return response.data;
};

export const generateReferenceGuide = async (data: GenerateReferenceGuide): Promise<Connect> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'project/guide-reference/', data, { headers });
  return response.data;
}

export const unlinkGithub = async (): Promise<Connect> => {
  const headers = getAuthorizationHeaders();
  const response = await axios.post(API_URL + 'project/unlink-repo/', {} ,{ headers });
  return response.data;
}
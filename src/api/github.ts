import axios from "axios";
import { API_URL } from "../services";
import { UserGithub } from "../interfaces/github/user-github.interface";
import { ProjectGithub } from "../interfaces/github/projects-github.interface";
import { getAuthorizationHeaders } from "../utils/authorization";
import { Connect } from "../interfaces/github/connect.interface";

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
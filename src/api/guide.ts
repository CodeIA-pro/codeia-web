import axios from "axios";
import { Asset, Guide, Privacy, PrivacyResponse, Star } from "../interfaces/guide/guide.interface";
import { API_URL } from "../services";
import { getAuthorizationHeaders } from "../utils/authorization";
import { Verify } from "../interfaces/common/verify.interface";
import { Connect } from "../interfaces/github/connect.interface";

export const guideProject = async (project: string, owner: string): Promise<Guide> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.get(API_URL + 'project/get/' + project + '/owner/' + owner + '/', { headers });
    return response.data;
  };

export const guideVersion = async (id: number): Promise<Verify> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.get(API_URL + 'project/' + id + '/sha/', { headers });
    return response.data;
  };

export const guideVersionProject = async (version: string, project: string, repo: string): Promise<Asset> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.get(API_URL + 'asset/guide/' + version + '/project/' + project + '/repo/' + repo + '/', { headers });
    return response.data[0];
  };

  export const guideURLProject = async (url: string): Promise<Asset> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.get(API_URL + 'asset/guide/' + url + '/', { headers });
    return response.data[0];
  };

  export const getPrivacy = async (project_id: number, asset_id: number): Promise<PrivacyResponse> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.get(API_URL + 'asset/privacy/project/'+ project_id +'/asset/'+ asset_id +'/', { headers });
    return response.data;
  };

  export const updatePrivacy = async (data: Privacy): Promise<PrivacyResponse> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.post(API_URL + 'asset/privacy/', data , { headers });
    return response.data;
  }

  export const starGuide = async (data: Star): Promise<Connect> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.post(API_URL + 'asset/star/', data , { headers });
    return response.data;
  }
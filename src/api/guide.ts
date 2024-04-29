import axios from "axios";
import { Guide } from "../interfaces/guide/guide.interface";
import { API_URL } from "../services";
import { getAuthorizationHeaders } from "../utils/authorization";
import { Verify } from "../interfaces/common/verify.interface";

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
import axios from "axios";
import { API_URL } from "../services";
import { getAuthorizationHeaders } from "../utils/authorization";
import { User } from "../interfaces/user/user.interface";

export const user = async (): Promise<User> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.get(API_URL + 'user/me/', { headers });
    return response.data;
  };

  export const updateUser = async (data: User): Promise<User> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.patch(API_URL + 'user/me/', data ,{ headers });
    return response.data;
  };
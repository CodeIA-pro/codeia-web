import axios from "axios";
import { API_URL } from "../services";
import { getAuthorizationHeaders } from "../utils/authorization";
import { ChangePassword, User } from "../interfaces/user/user.interface";
import { Connect } from "../interfaces/github/connect.interface";
import { Verify } from "../interfaces/common/verify.interface";

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

  export const twoFactorChange = async (): Promise<Connect> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.post(API_URL + 'user/two-factor/', {} ,{ headers });
    return response.data;
  };

  export const changePassword = async (data: ChangePassword): Promise<Verify> => {
    const headers = getAuthorizationHeaders();
    const response = await axios.post(API_URL + 'user/change-password/', data ,{ headers });
    return response.data;
  }
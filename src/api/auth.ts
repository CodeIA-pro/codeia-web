import axios from "axios";
import { API_URL } from "../services";
import { RegisterResponse, ResetPasswordRequest, UserResponse } from "../interfaces/user/user.interface";
import { CheckRequest, ForgotPasswordRequest, LoginRequest, RegisterRequest, TwoFARequest } from "../interfaces/auth/auth.interface";
import { Verify } from "../interfaces/common/verify.interface";

export const login = async (credetials: LoginRequest): Promise<UserResponse>  => {
    const response = await axios.post(API_URL +'user/login/', credetials);
    return response.data;
  };

export const twoFA = async (credetials: TwoFARequest): Promise<UserResponse>  => {
  const response = await axios.post(API_URL +'user/api/token/2FA/', credetials);
  return response.data;
};

export const forgotPassword = async (credetials: ForgotPasswordRequest): Promise<RegisterResponse>  => {
  const response = await axios.post(API_URL +'forgotten/auth/', credetials);
  return response.data;
};

export const resetPassword = async (credetials: ResetPasswordRequest): Promise<RegisterResponse>  => {
  const response = await axios.post(API_URL +'forgotten/auth/password/reset/', credetials);
  return response.data;
};

export const register = async (credetials: RegisterRequest): Promise<RegisterResponse>  => {
  const response = await axios.post(API_URL +'user/register/', credetials);
  return response.data;
};

export const check = async (credetials: CheckRequest): Promise<Verify>  => {
  const response = await axios.put(API_URL +'user/check/', credetials);
  return response.data;
};
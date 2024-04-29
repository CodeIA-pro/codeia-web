import { useMutation } from "@tanstack/react-query";
import { register, login, check, twoFA, forgotPassword, resetPassword } from "../api/auth";
import { CheckRequest, ForgotPasswordRequest, LoginRequest, RegisterRequest, TwoFARequest } from "../interfaces/auth/auth.interface";
import { useAuthStore } from "../store";
import { useNotification } from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { ResetPasswordRequest } from "../interfaces/user/user.interface";

export const useLogin = () => {
    const { login: Login } = useAuthStore();
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const mutation = useMutation({
        onSuccess: (data) => {
            if (data?.status){
                navigate('/verify');
                getError('Unverified account');
            }else if (data?.two_factor){
                navigate('/2FA');
            }else{
                getSuccess('Successful login');
                navigate('/projects');
                Login(data); 
            }
        },
        onError: (error) => {
            console.log(error);
            getError('Username or password incorrect');
        },
        mutationFn: (Login: LoginRequest) => login(Login),
    });
    return mutation;
  };

  export const use2FA = () => {
    const { login: Login } = useAuthStore();
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const mutation = useMutation({
        onSuccess: (data) => {
            getSuccess('Successful login');
            navigate('/projects');
            Login(data); 
        },
        onError: (error) => {
            console.log(error);
            getError('Invalid code 2FA or expired');
        },
        mutationFn: (Login: TwoFARequest) => twoFA(Login),
    });
    return mutation;
  };

  export const useForgotPassword = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const mutation = useMutation({
        onSuccess: (data) => {
            if(data.status){
                getSuccess(data.message);
                navigate('/login');
            }
            else{
                getError(data.message);
                navigate('/verify');
            }
        },
        onError: () => {
            getError('Email not registered in the system');
        },
        mutationFn: (Login: ForgotPasswordRequest) => forgotPassword(Login),
    });
    return mutation;
  };

  export const useRestPassword = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const mutation = useMutation({
        onSuccess: () => {
            getSuccess('Successful password reset');
            navigate('/login');
        },
        onError: () => {
            getError('Invalid code or expired');
        },
        mutationFn: (Login: ResetPasswordRequest) => resetPassword(Login),
    });
    return mutation;
  };

  export const useRegister = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const mutation = useMutation({
        onSuccess: (data) => {
            if(data.status){
                getError(data.message);
            }else{
                getSuccess('Successful registration');
                navigate('/verify');
            }
        },
        onError: (error) => {
            console.log(error);
            getError('Unexpected error, please try again later');
        },
        mutationFn: (Login: RegisterRequest) => register(Login),
    });
    return mutation;
  };

  export const useCheck = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const mutation = useMutation({
        onSuccess: () => {
            getSuccess('Successful verification');
            navigate('/login');
        },
        onError: (error) => {
            console.log(error);
            getError('Invalid code or expired');
        },
        mutationFn: (Login: CheckRequest) => check(Login),
    });
    return mutation;
  };
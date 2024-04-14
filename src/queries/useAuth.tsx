import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { LoginRequest } from "../interfaces/auth/auth.interface";
import { useAuthStore } from "../store";
import { useNotification } from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const { login: Login } = useAuthStore();
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const mutation = useMutation({
        onSuccess: (data) => { 
            getSuccess('Inicio de sesión exitoso');
            navigate('/projects');
            Login(data); 
        },
        onError: () => getError('Usuario o contraseña incorrectos'),
        mutationFn: (Login: LoginRequest) => login(Login),
    });
    return mutation;
  };
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GenericFrame } from "../common/Frame/GenericFrame";
import { BasicFrame } from "../common/Frame/BasicFrame";
import { FormGroup, TextField, Typography } from "@mui/material";
import { useLogin } from "../queries/useAuth";
import { LoginRequest } from "../interfaces/auth/auth.interface";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import ButtonUI from "../common/Button/ButtonUI";

const LoginView: React.FC = () => {
  const navigate = useNavigate()
  const { isLoading, mutate } = useLogin();
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
  
  useEffect(() => {
      if (user) navigate('/projects');
  }, [user, navigate]);

  const onSubmit = (data: LoginRequest) => {
    mutate(data);
  };

  return (
    <GenericFrame id="login" className="flex-col">
      <BasicFrame className="flex-col vs md:w-5/12 lg:w-3/12">
        <Typography
          variant="h4"
          sx={{ mt: 1, mb: 1, fontSize: "1.7em", textAlign: "center" }}
        >
          Iniciar sesión
        </Typography>
        <FormGroup className="w-full">
          <TextField
            fullWidth
            type="email"
            label="Email"
            margin="normal"
            autoComplete="email"
            sx={{ mt: 1, mb: 1.5 }}
            {...register("email", { required: "Este campo es obligatorio" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            autoComplete="current-password"
            sx={{ mt: 1, mb: 1.5 }}
            {...register("password", { required: "Este campo es obligatorio" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <ButtonUI
              text="Iniciar sesión"
              isLoading={isLoading}
              onClick={handleSubmit(onSubmit)}/>
        </FormGroup>
      </BasicFrame>
    </GenericFrame>
  );
};

export default LoginView;
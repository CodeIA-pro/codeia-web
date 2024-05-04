import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GenericFrame } from "../../../common/Frame/GenericFrame";
import { BasicFrame } from "../../../common/Frame/BasicFrame";
import { TextField, Typography } from "@mui/material";
import { useLogin } from "../../../queries/useAuth";
import { LoginRequest } from "../../../interfaces/auth/auth.interface";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";
import Logo from '../../../../assets/logo.svg';
import ButtonUI from "../../../common/Button/ButtonUI";

const LoginView: React.FC = () => {
  const { isLoading, mutate } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
  const { user } = useAuthStore();
  const navigate = useNavigate()
  
  useEffect(() => {
      if (user) navigate('/projects');
  }, [user, navigate]);

  const onSubmit = (data: LoginRequest) => {
    mutate(data);
  };

  return (
    <GenericFrame id="login" className="flex-col">
      <BasicFrame className="flex-col vs md:w-5/12 lg:w-3/12">
        <img src={Logo} alt="logo" style={{ width: '100px', height: '100px', margin: 'auto' }}/>
        <Typography
          variant="h4"
          sx={{ mt: 1, mb: 1, fontSize: "1.7em", textAlign: "center" }}
        >
          Log In
        </Typography>
        <form className="w-full">
          <TextField
            fullWidth
            type="email"
            label="Email"
            margin="normal"
            autoComplete="email"
            sx={{ mt: 1, mb: 1.5 }}
            {...register("email", { required: "This field is required" })}
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
            {...register("password", { required: "This field is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <ButtonUI
              text="Log In"
              isLoading={isLoading}
              className="w-full"
              onClick={handleSubmit(onSubmit)}/>
          <Typography sx={{color: '#222f4e', mt: 1, textAlign: 'center', cursor:'pointer'}} 
            onClick={() => navigate('/forgot-password')}>Forgot your password?</Typography>
        </form>
      </BasicFrame>
    </GenericFrame>
  );
};

export default LoginView;
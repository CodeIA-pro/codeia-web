import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GenericFrame } from "../../../common/Frame/GenericFrame";
import { BasicFrame } from "../../../common/Frame/BasicFrame";
import { FormGroup, TextField, Typography } from "@mui/material";
import { useRegister } from "../../../queries/useAuth";
import { RegisterRequest } from "../../../interfaces/auth/auth.interface";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store";
import ButtonUI from "../../../common/Button/ButtonUI";

const RegisterView: React.FC = () => {
  const navigate = useNavigate()
  const { isLoading, mutate, data } = useRegister();
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors }} = useForm<RegisterRequest>();
  
  useEffect(() => {
      if (user) navigate('/projects');
  }, [user, navigate]);

  const onSubmit = (data: RegisterRequest) => {
    mutate(data);
  };

  return (
    <GenericFrame id="login" className="flex-col">
      <BasicFrame className="flex-col vs md:w-5/12 lg:w-3/12">
        <Typography
          variant="h4"
          sx={{ mt: 1, mb: 1, fontSize: "1.7em", textAlign: "center" }}
        >
          Sign Up
        </Typography>
        <FormGroup className="w-full">
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
            type="text"
            label="Name"
            margin="normal"
            sx={{ mt: 1, mb: 1.5 }}
            {...register("name", { required: "This field is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            type="text"
            label="Surname"
            margin="normal"
            sx={{ mt: 1, mb: 1.5 }}
            {...register("surname", { required: "This field is required" })}
            error={!!errors.surname}
            helperText={errors.surname?.message}
          />
          <TextField
            fullWidth
            type="date"
            label="Date of Birth"
            margin="normal"
            sx={{ mt: 1, mb: 1.5 }}
            InputLabelProps={{
              shrink: true,
          }}
            {...register("date_of_birth", { required: "This field is required" })}
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth?.message}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            sx={{ mt: 1, mb: 1.5 }}
            {...register("password", { required: "This field is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <ButtonUI
              text="Register"
              isLoading={isLoading}
              onClick={handleSubmit(onSubmit)}/>
          { data && data.status && <Typography sx={{color: '#222f4e', mt: 1, textAlign: 'center', cursor:'pointer'}} 
            onClick={() => navigate('/forgot-password')}>Forgot your password?</Typography> }
        </FormGroup>
      </BasicFrame>
    </GenericFrame>
  );
};

export default RegisterView;
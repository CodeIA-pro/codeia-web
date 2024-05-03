import { TextField, Typography } from "@mui/material";
import { GenericFrame } from "../../../common/Frame/GenericFrame";
import { useEffect, useState } from "react";
import { useRestPassword } from "../../../queries/useAuth";
import GenericPaper from "../../../common/Container/GenericPaper";
import ButtonValidateUI from "../../../common/Button/ButtonValidateUI";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../../store";

const ResetPassword: React.FC = () => {
    const params = useParams();
    const [code, setCode] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const {isLoading, mutate} = useRestPassword();
    const { user } = useAuthStore();
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) navigate('/projects');
    }, [user, navigate]);

    const validate = (code === '' || confirmCode === '' || code !== confirmCode); 

    const validatePassword = (value: string) => {
      setCode(value);
      const isValid = validate;
      return isValid;
    }
    
    const validateConfirmPassword = (value: string) => {
      setConfirmCode(value);
      const isValid = validate;
      return isValid;
    }

    const onSubmit = () => {
        mutate({password: code, code: params.code as string});
    }
  return(
    <GenericFrame>
        <GenericPaper style={{width: '90vw', maxWidth: '560px', padding:'3em'}} className="flex flex-col justify-start items-start">
          <Typography sx={{fontSize:'1.2em', textAlign: 'start', fontWeight:'700'}}>Ready to reset your password?</Typography>
          <Typography sx={{fontSize:'1em', textAlign: 'start', fontWeight:'300'}}>Please enter your new password below and confirm it to complete the reset process.</Typography>
          <TextField
              type="password"
              label="Password"
              margin="normal"
              sx={{marginTop: '1em',}}
              inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
              onChange={(e) => validatePassword(e.target.value)}
              fullWidth
            />
          <TextField
              type="password"
              label="Confirm Password"
              margin="normal"
              sx={{marginTop: '1em',}}
              inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
              onChange={(e) => validateConfirmPassword(e.target.value)}
              fullWidth
            />
            { (code === '' || confirmCode === '' || code == confirmCode) ? null : <Typography sx={{fontSize:'1em', textAlign: 'start', fontWeight:'300', color: 'red', }}>Passwords do not match</Typography>}
        <ButtonValidateUI
          text="Send"
          disabled={!validate}
          isLoading={isLoading}
          style={{fontSize: '0.9em',  borderRadius: '0.7em', width: '100px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff', marginTop:'1em' , marginLeft:'0' }}
          onClick={onSubmit}/>
      </GenericPaper>
    </GenericFrame>
  );
}

export default ResetPassword;
import { TextField, Typography } from "@mui/material";
import { GenericFrame } from "../common/Frame/GenericFrame";
import { useEffect, useState } from "react";
import GenericPaper from "../common/Container/GenericPaper";
import { useForgotPassword } from "../queries/useAuth";
import { validateEmail } from "../utils/filtered";
import ButtonValidateUI from "../common/Button/ButtonValidateUI";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

const ForgottenPassword: React.FC = () => {
    const [code, setCode] = useState('');
    const [disabled, setDisabled] = useState(false);
    const {isLoading, mutate} = useForgotPassword();
    const { user } = useAuthStore();
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) navigate('/projects');
    }, [user, navigate]);

    const validate = (value: string) => {
        setCode(value);
        const validate = validateEmail(value); 
        (validate) ? setDisabled(false) : setDisabled(true);
      return validate;
    }
    const onSubmit = () => {
        mutate({email: code});
    }
  return(
    <GenericFrame>
        <GenericPaper style={{width: '90vw', maxWidth: '560px', padding:'3em'}} className="flex flex-col justify-start items-start">
        <Typography sx={{fontSize:'1.2em', textAlign: 'start', fontWeight:'700'}}>Forgot your password?</Typography>
            <Typography sx={{fontSize:'1em', textAlign: 'start', fontWeight:'300'}}>No worries! You can reset it by providing your email address.</Typography>
            <Typography sx={{fontSize:'1em', textAlign: 'start', fontWeight:'300', mt:2}}>We'll send you a message to that email with instructions on how to reset your password.</Typography>
              <TextField 
                  type="text"
                  sx={{marginTop: '1em',}}
                  inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                  onChange={(e) => validate(e.target.value)}
                  fullWidth
                  className='input'
                  defaultValue={''}
                />
            <ButtonValidateUI
              text="Send"
              disabled={disabled}
              isLoading={isLoading}
              style={{fontSize: '0.9em',  borderRadius: '0.7em', width: '100px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff', marginTop:'1em' , marginLeft:'0' }}
              onClick={onSubmit}/>
        </GenericPaper>
    </GenericFrame>
  );
}

export default ForgottenPassword;
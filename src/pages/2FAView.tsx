import { TextField, Typography } from "@mui/material";
import { GenericFrame } from "../common/Frame/GenericFrame";
import { useEffect, useState } from "react";
import GenericPaper from "../common/Container/GenericPaper";
import { use2FA } from "../queries/useAuth";
import { validateNumber } from "../utils/filtered";
import ButtonValidateUI from "../common/Button/ButtonValidateUI";
import { useAuthStore } from "../store";
import { useNavigate } from "react-router-dom";

const TwoFAView: React.FC = () => {
    const [code, setCode] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const {isLoading, mutate} = use2FA();
    const { user } = useAuthStore();
    const navigate = useNavigate()
    
    useEffect(() => {
        if (user) navigate('/projects');
    }, [user, navigate]);

    const validate = (value: number) => {
      setCode(value);
      const validate = validateNumber(value); 
       (validate) ? setDisabled(false) : setDisabled(true);
      return validate;
    }
    const onSubmit = () => {
        mutate({code: code});
    }
  return(
    <GenericFrame>
        <GenericPaper style={{width: '90vw', maxWidth: '560px', padding:'3em'}} className="flex flex-col justify-start items-start">
        <Typography sx={{fontSize:'1.2em', textAlign: 'start', fontWeight:'700'}}>Two-factor authentication</Typography>
            <Typography sx={{fontSize:'1em', textAlign: 'start', fontWeight:'300'}}>You have two-factor authentication set-up on your account for added security.</Typography>
            <Typography sx={{fontSize:'1em', textAlign: 'start', fontWeight:'300', mt:2}}>A code has just been sent to your email. <br></br> Please enter it below.</Typography>
              <TextField 
                  type="number"
                  sx={{
                    marginTop: '1em',
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                      WebkitAppearance: 'none',
                      margin: 0,
                    },
                  }}
                  inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                  onChange={(e) => validate(+e.target.value)}
                  fullWidth
                  className='input'
                  defaultValue={''}
                />
            <ButtonValidateUI
              text="Send"
              disabled={disabled}
              isLoading={isLoading}
              style={{fontSize: '0.9em',  borderRadius: '0.7em', width: '100px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff', marginTop:'1em', marginLeft:'0' }}
              onClick={onSubmit}/>
        </GenericPaper>
    </GenericFrame>
  );
}

export default TwoFAView;
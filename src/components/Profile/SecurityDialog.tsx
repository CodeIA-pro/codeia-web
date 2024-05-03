import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField, Typography } from '@mui/material';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import ButtonValidateUI from '../../common/Button/ButtonValidateUI';
import { useChangePassword } from '../../queries/useUser';

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const SecurityDialog: React.FC<DialogProps> = ({ open, onClose }) => {
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const {isLoading, mutate, data, reset} = useChangePassword();

    const validate = (code === '' || confirmCode === '' || code !== confirmCode); 

    useEffect(() => {
        if (data) {
            onClose();
            reset();
        }
    }, [data, onClose, isLoading, reset])

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
        mutate({password: password, new_password: code})
    }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <div style={{padding:'1em'}}>
            <DialogTitle style={{padding:'15px 24px 5px 24px'}}>
                <Typography style={{ textAlign:'start', fontSize: '0.9em', fontWeight: 'bold', display:'flex', flexDirection:'row', alignItems:'center', }}>
                  Change account password
                </Typography>
            </DialogTitle>
            <DialogContent className='flex items-center justify-center' style={{padding:'0 10px'}}>
                <BasicFrame isCentered={false} className='flex-col justify-start mt-2 mb-5' style={{width:'95%'}}>
                <TextField
                    type="password"
                    label="Current password"
                    margin="normal"
                    sx={{marginTop: '1em',}}
                    inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    type="password"
                    label="New password"
                    margin="normal"
                    sx={{marginTop: '1em',}}
                    inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                    onChange={(e) => validatePassword(e.target.value)}
                    fullWidth
                  />
                <TextField
                    type="password"
                    label="Confirm new password"
                    margin="normal"
                    sx={{marginTop: '1em',}}
                    inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                    onChange={(e) => validateConfirmPassword(e.target.value)}
                    fullWidth
                  />
                  { (code === '' || confirmCode === '' || code == confirmCode) ? null : <Typography sx={{fontSize:'1em', textAlign: 'start', fontWeight:'300', color: 'red', }}>Passwords do not match</Typography>}
                </BasicFrame>
            </DialogContent>
            <DialogActions>
                <BasicFrame isCentered={false} className='justify-end pr-4' style={{width:'90%', height:'40px'}}>
                    <Button onClick={onClose} style={{ fontSize: '0.8em', borderRadius: '0.7em', width: '130px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff' }}>Cancelar</Button>
                    <ButtonValidateUI
                      text="Change Password"
                      disabled={!validate && password !== ''}
                      isLoading={isLoading}
                      style={{ height:'100%', textTransform: 'none', fontSize: '0.8em',  borderRadius: '0.7em', width: '180px', backgroundColor:'#6c93f1', color:'#fff' , marginLeft:'0.5em'}}
                      onClick={onSubmit}/>
                </BasicFrame>
            </DialogActions>
        </div>
    </Dialog>
  );
};

export default SecurityDialog;
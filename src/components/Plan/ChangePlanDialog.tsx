import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField, Typography } from '@mui/material';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import ButtonValidateUI from '../../common/Button/ButtonValidateUI';
import { useSubscribe } from '../../queries/useSubscription';

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const ChangePlanDialog: React.FC<DialogProps> = ({ open, onClose }) => {

    const {mutate, isLoading, reset, data} = useSubscribe();
    const [code, setCode] = useState('');

    useEffect(() => {
        if (data && data.status === 'success') {
            onClose();
            reset();
        }
    }, [data, onClose, isLoading, reset])


    const onSubmit = () => {
        mutate({code: code});
    }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <div style={{padding:'1em'}}>
            <DialogTitle style={{padding:'15px 24px 5px 24px'}}>
                <Typography style={{ textAlign:'start', fontSize: '0.9em', fontWeight: 'bold', display:'flex', flexDirection:'row', alignItems:'center', }}>
                  Change Plan
                </Typography>
            </DialogTitle>
            <DialogContent className='flex items-center justify-center' style={{padding:'0 10px'}}>
                <BasicFrame isCentered={false} className='flex-col justify-start mt-2 mb-5' style={{width:'95%'}}>
                  <TextField
                      type="text"
                      label="Enter coupon code"
                      margin="normal"
                      sx={{marginTop: '1em',}}
                      inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                      onChange={(e) => setCode(e.target.value)}
                      fullWidth
                    /> 
                  </BasicFrame>
            </DialogContent>
            <DialogActions>
                <BasicFrame isCentered={false} className='justify-end pr-4' style={{width:'90%', height:'40px'}}>
                    <Button onClick={onClose} style={{ fontSize: '0.8em', borderRadius: '0.7em', width: '130px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff' }}>Cancelar</Button>
                    <ButtonValidateUI
                      text="Change Plan"
                      disabled={ code!==''}
                      isLoading={isLoading}
                      style={{ height:'100%', textTransform: 'none', fontSize: '0.8em',  borderRadius: '0.7em', width: '180px', backgroundColor:'#6c93f1', color:'#fff' , marginLeft:'0.5em'}}
                      onClick={onSubmit}/>
                </BasicFrame>
            </DialogActions>
        </div>
    </Dialog>
  );
};

export default ChangePlanDialog;
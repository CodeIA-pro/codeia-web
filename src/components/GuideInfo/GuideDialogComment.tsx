import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, TextField, Typography } from '@mui/material';
import { useComments, useCreateCommets } from '../../queries/useComment';
import { Comments } from '../../interfaces/comment/comment.interface';
import ButtonValidateUI from '../../common/Button/ButtonValidateUI';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { useNotification } from '../../hooks/useNotification';
import { containsSpecialCharacters } from '../../utils/filtered';

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const GuideDialogComment: React.FC<DialogProps> = ({ open, onClose}) => {
  const {isLoading: loadComments, data: commets} = useComments();
  const {mutate, isLoading, reset, data} = useCreateCommets();
  const {getError} = useNotification();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
        if (data) {
            onClose();
            reset();
        }
  }, [data, onClose, isLoading, reset])

  const validate = title !== '' && description !== '';

  const handleSave = () => {
    const type_id = commets?.filter((item: Comments) => item.description === 'Other')[0];
    if (containsSpecialCharacters(title + description)) {
        getError('Special characters are not allowed');
    }else if (validate && type_id) mutate({type_id: type_id?.id, title, description});
  };

  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <div style={{padding:'1em',}}>
            
                <DialogTitle>
                <Typography style={{ textAlign:'start', fontSize: '0.9em', fontWeight: '400', display:'flex', flexDirection:'row', alignItems:'center' }}>
                    Leave us a comment
                </Typography>
            </DialogTitle>
            <DialogContent sx={{paddingBottom:'0.7em'}}>
                <FormControl sx={{ m: 0, width: '100%', paddingTop:'0.5em' }}>

                    <BasicFrame className='mb-3'>
                        <TextField 
                            type="text" 
                            inputProps={{style: {fontSize: 16}}} // font size of input text
                            fullWidth
                            className='input'
                            label="Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </BasicFrame>

                    <BasicFrame>
                        <TextField 
                            type="text" 
                            inputProps={{style: {fontSize: 16, fontWeight:'500'}}} // font size of input text
                            fullWidth
                            className='input'
                            label="Description"
                            multiline
                            rows={4} 
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </BasicFrame>
                    
                </FormControl>
            </DialogContent>
            <DialogActions sx={{paddingRight: '1.3em'}}>
                <Button onClick={onClose} style={{fontSize: '0.8em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff' }}>Cancelar</Button>
                <ButtonValidateUI
                      text="Send"
                      disabled={validate}
                      isLoading={loadComments || isLoading}
                      style={{ height:'100%', textTransform: 'none', fontSize: '0.8em', width:'82px',  borderRadius: '0.7em', backgroundColor:'#6c93f1', color:'#fff' , marginLeft:'0.5em'}}
                      onClick={handleSave}/>
            </DialogActions>
        </div>
    </Dialog>
  );
};

export default GuideDialogComment;

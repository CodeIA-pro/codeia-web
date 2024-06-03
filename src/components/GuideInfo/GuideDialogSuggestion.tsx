import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useComments, useCreateCommets } from '../../queries/useComment';
import { Comments } from '../../interfaces/comment/comment.interface';
import ButtonValidateUI from '../../common/Button/ButtonValidateUI';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { containsSpecialCharacters } from '../../utils/filtered';
import { useNotification } from '../../hooks/useNotification';

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const GuideDialogSuggestion: React.FC<DialogProps> = ({ open, onClose}) => {
  const {isLoading: loadComments, data: commets} = useComments();
  const {mutate, isLoading, reset, data} = useCreateCommets();
  const {getError} = useNotification();
  const [text, setText] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
        if (data) {
            onClose();
            reset();
            setText(0);
        }
  }, [data, onClose, isLoading, reset])

  const validate = title !== '' && text !== 0 && description !== '';

  const handleSave = () => {
    if (containsSpecialCharacters(title + description)) {
        getError('Special characters are not allowed');
    }else if (validate) mutate({type_id: text, title, description});
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <div style={{padding:'1em',}}>
            
                <DialogTitle>
                <Typography style={{ textAlign:'start', fontSize: '0.9em', fontWeight: '400', display:'flex', flexDirection:'row', alignItems:'center' }}>
                    Leave us a suggestion
                </Typography>
            </DialogTitle>
            <DialogContent sx={{paddingBottom:'0.7em'}}>
                <FormControl sx={{ m: 0, width: '100%', paddingTop:'0.5em' }}>
                    <BasicFrame className='mb-3'>
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="type-of-comment-label">Type of suggestion</InputLabel>
                            {
                                loadComments && commets ? (
                                    <TextField 
                                        type="text" 
                                        inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                                        fullWidth
                                        className='input'
                                        disabled
                                        defaultValue="Loading comments..."
                                    />
                                ) : 
                                <Select
                                    labelId="type-of-comment-label"
                                    value={text}
                                    onChange={(e) => setText(+e.target.value)}
                                    label="Type of suggestion"
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    style={{ width: '100%' }}
                                >
                                    { commets?.map((option: Comments) => (
                                    <MenuItem key={option?.id} value={option?.id}>
                                        <p style={{ fontSize: '0.9em', margin: 0 }}>
                                        {option?.description}
                                        </p>
                                    </MenuItem>
                                    ))}
                                    <MenuItem key={0} value={0}>
                                        <p style={{ fontSize: '0.9em', margin: 0 }}>
                                            Select a type of suggestion
                                        </p>
                                    </MenuItem>
                                </Select>
                            }
                        </FormControl>
                    </BasicFrame>
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

export default GuideDialogSuggestion;

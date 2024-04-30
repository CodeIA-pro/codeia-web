import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FormControl, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';

import { Asset } from '../../interfaces/guide/guide.interface';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  initialData: Asset | undefined;
}

const GuideCompilationDialog: React.FC<DialogProps> = ({ open, onClose,  initialData}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth className="dialog">
        <div style={{height: '80vh', overflow: 'auto'}}>
            <div style={{ position: 'sticky', top: 0, zIndex: 2 , backdropFilter: 'blur(0.1em)', padding:'0.4em 1em'}}>
                <Typography style={{ textAlign: 'start', fontSize: '1.2em', fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1em 1em 0.5em 1em' }}>
                    Compilation in real time <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }}/>
                </Typography>
            </div>
            <DialogContent style={{paddingTop:0}}>
                <FormControl sx={{ m: 0, width: '100%' }}>
                    <List>
                        {initialData?.subsection?.map((item: Asset) => 
                            <ListItem key={item.id} style={{ padding: '0.4em 0em' }}>
                                <span className='code' style={{ fontSize: '0.8em' }}>{item?.description}</span>
                            </ListItem>
                        )}
                    </List>
                </FormControl>
            </DialogContent>
        </div>
    </Dialog>
  );
};

export default GuideCompilationDialog;
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Typography } from '@mui/material';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { useUnlinkGithub } from '../../queries/useProject';
import { useNotification } from '../../hooks/useNotification';

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const ProfileGithubDialog: React.FC<DialogProps> = ({ open, onClose }) => {
  const {mutate} = useUnlinkGithub();
  const {getWarning} = useNotification();
  const handleSave = () => {
    mutate();
    getWarning('Processing request...');
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <div style={{padding:'1em'}}>
            
            <DialogTitle style={{padding:'15px 24px 5px 24px'}}>
                <Typography style={{ textAlign:'start', fontSize: '0.9em', fontWeight: 'bold', display:'flex', flexDirection:'row', alignItems:'center', }}>
                    Remove your GitHub Account
                </Typography>
            </DialogTitle>
            <DialogContent className='flex items-center justify-center' style={{padding:'0 10px'}}>
                <BasicFrame isCentered={false} className='flex-col justify-start mt-8 mb-5' style={{width:'95%'}}>
                   <Typography style={{fontSize: '0.8em', textAlign:'start'}}>
                   Are you certain you want to proceed with removing your GitHub account? <br></br> <br></br>                    
                   Doing so may result in service downtime, as you will be unable to redeploy services created from GitHub repositories. <br></br> <br></br> 
                   If you confirm the removal by clicking "Remove GitHub," your data will be deleted from our servers. However, you will need to manually remove the integration from the GitHub Apps section.
                   </Typography>
                </BasicFrame>
            </DialogContent>
            <DialogActions>
                <BasicFrame isCentered={false} className='justify-end pr-4' style={{width:'90%', height:'48px'}}>
                    <Button onClick={onClose} style={{ fontSize: '0.8em', borderRadius: '0.7em', width: '130px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff' }}>Cancelar</Button>
                    <Button 
                      onClick={handleSave}
                      style={{marginLeft:'0.5em', fontSize: '0.8em',  borderRadius: '0.7em', width: '130px', textTransform: 'none', color:'#fff', backgroundColor: '#ff5c88', }}>
                        Remove Github
                    </Button>
                </BasicFrame>
            </DialogActions>
        </div>
    </Dialog>
  );
};

export default ProfileGithubDialog;
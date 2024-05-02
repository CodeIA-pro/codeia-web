import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, CircularProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { Asset } from '../../interfaces/guide/guide.interface';
import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';
import HttpsIcon from '@mui/icons-material/Https';
import { useGuidePrivacy, useGuidePrivacyStatus } from '../../queries/useGuide';
import { useNotification } from '../../hooks/useNotification';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


interface DialogProps {
  initialData: Asset;
  open: boolean;
  version: string;
  onClose: () => void;
}

const GuideSharedDialog: React.FC<DialogProps> = ({ initialData, open, onClose }) => {
    const {isLoading: loadingPrivacy, data: privacy} = useGuidePrivacyStatus(initialData?.project_id, initialData?.id);
    const [access, setAccess] = React.useState<string>('');
    const {mutate, isLoading} = useGuidePrivacy();
    const { getSuccess, getWarning } =useNotification();

    useEffect(() => {
        setAccess(privacy?.privacy || 'private');
    }, [loadingPrivacy, privacy]);

    const handleChange = (event: any) => {
        const privacy = event.target.value as string;
        setAccess(privacy);
        if (initialData){
            mutate({project_id: initialData?.project_id, asset_id: initialData?.id, privacy: privacy});
        }
    };

    const copyLink = () => {
        if (!loadingPrivacy && privacy && privacy?.link) {
            navigator.clipboard.writeText(`https://codeia-web.vercel.app/guide/shared/${privacy.link}`);
            getSuccess('Link copied');
        }
        else{
            getWarning('Generating link...');
        }
    }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <BasicFrame isCentered={false} className='w-full p-5 flex-col'>
        <DialogTitle style={{padding: '10px'}}>
            <Typography style={{ textAlign:'start', fontSize: '0.85em', fontWeight: '400', display:'flex', flexDirection:'row', alignItems:'center', paddingLeft:'0' }}>
                Publish "{initialData?.titulo} {initialData?.version}v"
            </Typography>
            </DialogTitle>
            <DialogContent style={{padding: '10px'}}>
                <BasicFrame isCentered={false} className='justify-start items-center pt-1 pb-6'>                    
                    { 
                        loadingPrivacy || isLoading ?
                        <BasicFrame style={{backgroundColor: '#e3e3e3', padding:'0.5em', borderRadius:'9em', width:'60px', height:'60px'}}>
                            <HourglassBottomIcon style={{fontSize: '1.5em', color:'#072711'}}/>
                        </BasicFrame> :
                        access === 'private' ? 
                        <BasicFrame style={{backgroundColor: '#e3e3e3', padding:'0.5em', borderRadius:'9em', width:'60px', height:'60px'}}>
                            <HttpsIcon style={{fontSize: '1.5em', color:'#072711'}}/>
                        </BasicFrame>
                        : 
                        <BasicFrame style={{backgroundColor: '#c4eed0', padding:'0.5em', borderRadius:'9em', width:'60px', height:'60px'}}>
                            <PublicIcon style={{fontSize: '1.5em', color:'#072711'}}/>
                        </BasicFrame>
                    }
                    <BasicFrame isCentered={false} className='ml-4 flex-col'>
                    {
                        loadingPrivacy || isLoading ? 
                        (
                            <TextField
                                disabled
                                type="text"
                                defaultValue="updating..."
                                sx={{
                                    width: '110px',
                                    borderRadius: '.375rem',
                                    '& .MuiOutlinedInput-input': {
                                    padding: '4px 12px',
                                    }
                                }}
                            />
                        ) :
                        (
                            <Select
                                disabled={isLoading || loadingPrivacy}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={access}
                                onChange={handleChange}
                                style={{ fontSize: '1rem', height:'30px', width:'100px', fontWeight: '400'}}
                            >
                                <MenuItem style={{ fontSize: '1rem' }} value='private'>Private</MenuItem>
                                <MenuItem style={{ fontSize: '1rem' }} value='public'>Public</MenuItem>
                            </Select>
                        )
                    }
                    
                    {
                        loadingPrivacy || isLoading ? 
                        (
                            <Typography style={{fontSize: '0.8em', fontWeight: '500', marginTop:'0.5em'}}>wait a moment...</Typography>
                        ) :
                        access === 'private' ? 
                        <Typography style={{fontSize: '0.8em', fontWeight: '500', marginTop:'0.5em'}}>Only people with the link can view</Typography>
                        :
                        <Typography style={{fontSize: '0.8em', fontWeight: '500', marginTop:'0.5em'}}>Any Internet user with the link can see it</Typography>
                    }
                    </BasicFrame>
                </BasicFrame>
            </DialogContent>
            <DialogActions style={{display:'flex', justifyContent:'space-between', padding:'0 10px'}}>
                <Button variant="outlined" 
                    disabled={ access === 'private' || isLoading }
                    onClick={() => copyLink()} style={{fontSize: '0.8em', borderRadius: '0.7em', border:'2px solid #6c93f1', width: '135px',}} 
                    sx={{opacity: (access === 'private' || isLoading) ? 0.5 : 1, }}>
                    <LinkIcon style={{cursor: 'pointer', color:'#6c93f1', fontSize:'1.4em', marginRight: '0.5em'}}/>
                    <Typography fontWeight="500" style={{fontSize: '1em', textTransform: 'none', color:'#6c93f1'}}>Copy link</Typography>
                </Button>
                <Button 
                    onClick={onClose}  
                    disabled={isLoading || loadingPrivacy}
                    sx={{
                        opacity: (isLoading || loadingPrivacy) ? 0.5 : 1, // Reduce la opacidad cuando no está seleccionado
                        '&:disabled': {
                        backgroundColor: 'grey', // Cambia el color de fondo cuando está deshabilitado
                        },
                    }}
                    style={{marginLeft:'0.5em', fontSize: '0.8em',  borderRadius: '0.7em', width: '135px', textTransform: 'none', color:'#fff', backgroundColor: '#6c93f1', }}>
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {(isLoading || loadingPrivacy) && (
                            <CircularProgress 
                                size={24} 
                                sx={{ color: 'white', position: 'absolute' }}
                            />
                            )}
                        <span style={{ visibility: (isLoading || loadingPrivacy) ? 'hidden' : 'visible' }}>Done</span>
                    </Box>
                </Button>
            </DialogActions>
        </BasicFrame>
    </Dialog>);
}

export default GuideSharedDialog;
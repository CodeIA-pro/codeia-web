import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { Asset } from '../../interfaces/guide/guide.interface';
import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';
import HttpsIcon from '@mui/icons-material/Https';
import { useGuidePrivacy } from '../../queries/useGuide';
import { useNotification } from '../../hooks/useNotification';


interface DialogProps {
  initialData: Asset | undefined;
  open: boolean;
  version: string;
  onClose: () => void;
}

const GuideSharedDialog: React.FC<DialogProps> = ({ initialData, open, onClose }) => {
    const [access, setAccess] = React.useState<string>(initialData?.privacy || 'public');
    const [link, setLink] = React.useState<string>('');
    const {mutate, isLoading, data} = useGuidePrivacy();
    const { getSuccess, getWarning } =useNotification();

    useEffect(() => {
        setAccess(initialData?.privacy || 'public');
    }, [initialData]);

    useEffect(() => {
        if(!isLoading && data && data.link !== '') {
            setLink(data.link);
        }
    }, [isLoading, data]);

    const handleChange = (event: any) => {
        console.log(initialData);
        const privacy = event.target.value as string;
        setAccess(privacy);
        if (initialData){
            mutate({project_id: initialData?.project_id, asset_id: initialData?.id, privacy: privacy});
        }
    };

    const copyLink = () => {
        console.log(link);
        if (link !== '') {
            navigator.clipboard.writeText(`http://localhost:5173/guide/shared/${link}`);
            getSuccess('Link copied');
        }
        else if (initialData && initialData.url !== ''){
            navigator.clipboard.writeText(`http://localhost:5173/guide/shared/${initialData.url}`);
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
                <BasicFrame isCentered={false} className='justify-start items-center pt-2 pb-4'>                    
                    { access === 'private' ? 
                        <BasicFrame style={{backgroundColor: '#e3e3e3', padding:'0.5em', borderRadius:'9em', width:'50px', height:'50px'}}>
                            <HttpsIcon style={{fontSize: '1.5em', color:'#072711'}}/>
                        </BasicFrame>
                         : 
                        <BasicFrame style={{backgroundColor: '#c4eed0', padding:'0.5em', borderRadius:'9em', width:'50px', height:'50px'}}>
                            <PublicIcon style={{fontSize: '1.5em', color:'#072711'}}/>
                        </BasicFrame>
                    }
                    <BasicFrame isCentered={false} className='ml-2 flex-col'>
                    <Select
                        disabled={isLoading}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={access}
                        onChange={handleChange}
                        style={{ fontSize: '1rem', height:'30px', width:'100px', fontWeight: '400'}}
                    >
                        <MenuItem style={{ fontSize: '1rem' }} value='private'>Private</MenuItem>
                        <MenuItem style={{ fontSize: '1rem' }} value='public'>Public</MenuItem>
                    </Select>
                    {
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
                      disabled={isLoading}
                      sx={{
                        opacity: (isLoading) ? 0.5 : 1, // Reduce la opacidad cuando no está seleccionado
                        '&:disabled': {
                        backgroundColor: 'grey', // Cambia el color de fondo cuando está deshabilitado
                        },
                    }}
                      style={{marginLeft:'0.5em', fontSize: '0.8em',  borderRadius: '0.7em', width: '135px', textTransform: 'none', color:'#fff', backgroundColor: '#6c93f1', }}>
                      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isLoading && (
                            <CircularProgress 
                                  size={24} 
                                  sx={{ color: 'white', position: 'absolute' }}
                              />
                            )}
                        <span style={{ visibility: isLoading ? 'hidden' : 'visible' }}>Done</span>
                      </Box>
                </Button>
            </DialogActions>
        </BasicFrame>
    </Dialog>);
}

export default GuideSharedDialog;
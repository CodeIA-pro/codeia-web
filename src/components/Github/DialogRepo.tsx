import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, CircularProgress, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useGithubProjectWithLanguages } from '../../queries/useGithub';
import { ProjectGithub } from '../../interfaces/github/projects-github.interface';
import { CreateProjectGithub } from '../../interfaces/project/projects.interface';
import TypographyFlow from '../../common/Typography/TypographyFlow';
import { Datum } from '../../interfaces/github/branches.interface';
import { GithubBranchContext } from '../../context/GithubBranch';
import { Project } from "../../interfaces/project/projects.interface";
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { useProjects } from '../../queries/useProject';
import DialogProject from '../Project/ProjectDialog';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: string) => void;
  initialData: ProjectGithub;
}

const data: CreateProjectGithub = {
    title: '',
    branch: '',
    url_repo: '',
    user_repo: '',
    root: '',
    project_id: 0,
};

const DialogRepo: React.FC<DialogProps> = ({ open, onClose, onSave,  initialData}) => {
  const [dialogData, setDialogData] = useState<string>('');
  const [projData, setProjData] = useState<number>(0);
  const [root, setRoot] = useState<string>('');
  const {data: projects, isLoading: isLoadingProjs} = useProjects();
  const {isLoading, mutate: Branches, data: branches} = React.useContext(GithubBranchContext);
  const {isLoading: isLoadingProj, mutate: Project, isSuccess} = useGithubProjectWithLanguages();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  useEffect(() => {
    if(initialData){
        if(!isLoading && !branches){
        setDialogData(initialData.default_branch);
        setProjData(0);
        Branches(initialData.name,initialData.owner.login);
      }
      if (isSuccess) onClose();
    }
  }, [initialData, isLoading, branches, Branches, isSuccess, onClose]);

  const handleSave = () => {
      data.branch = dialogData;
      data.root = root;
      data.project_id = projData;
      data.url_repo = initialData?.html_url;
      data.user_repo = initialData?.owner?.login;
      data.title = initialData?.name;
      Project(data);
      onSave(dialogData);
  }

  const selected = dialogData !== '' && projData !== 0;
  const loading = isLoadingProj || isLoadingProjs || isLoading;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <BasicFrame isCentered={false} className='w-full p-5 flex-col'>
        <DialogTitle className='flex items-center justify-start flex-row '>
            <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: '400', display:'flex', flexDirection:'row', alignItems:'center' }}>
                You are deploying a guide for&nbsp;  
            </Typography>
            <TypographyFlow style={{fontSize:'0.8em', fontWeight:'bold'}}>{initialData?.owner?.login}/{initialData?.name}</TypographyFlow>
        </DialogTitle>
        <DialogContent>
            <BasicFrame isCentered={false} className='w-full p-1 flex-col'>
                <BasicFrame className='mb-4' style={{height:'50px'}}>
                    <Container style={{ margin:0, padding:0,}}>
                        <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: 'bold' }}>
                            Branch
                        </Typography>
                        <Typography style={{ textAlign:'start', fontSize: '0.7em',}}>
                            Select a branch from your repository.
                        </Typography>
                    </Container>

                    {isLoading && !branches ? (
                        <TextField 
                        type="text" 
                        inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                        fullWidth
                        className='input'
                        disabled
                        defaultValue="Loading branches..."
                    />
                    ) : (
                        <Select
                        value={dialogData}
                        onChange={(e) => setDialogData(e.target.value)}
                        displayEmpty
                        style={{ width: '100%', height: '100%' }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        {branches?.data.map((option: Datum) => (
                            <MenuItem style={{ width: '100%' }} key={option?.name} value={option?.name}>
                                <p style={{ fontSize: '0.7em', margin: 0 }}>
                                {option?.name === initialData?.default_branch
                                    ? initialData?.default_branch
                                    : option?.name}
                                </p>
                            </MenuItem>
                        ))}
                    </Select>
                    )}
                </BasicFrame>
                <BasicFrame className='mb-4'>
                    <Container style={{ margin:0, padding:0,}}>
                        <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: 'bold' }}>
                            Root Directory &nbsp;<span style={{fontSize: '0.9em', fontWeight: '500'}}>Optional</span>
                        </Typography>
                        <Typography style={{ textAlign:'start', fontSize: '0.7em',}}>
                            Defaults to repository root. 
                        </Typography>
                    </Container>
                    <TextField 
                        type="text" 
                        inputProps={{style: {fontSize: 13}}} // font size of input text
                        fullWidth
                        className='input'
                        placeholder="e.g. src"
                        onChange={(e) => setRoot(e.target.value)}
                    />
                </BasicFrame>
                <BasicFrame className='mb-4'>
                    <Container style={{ margin:0, padding:0,}}>
                        <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: 'bold' }}>
                            Repository url                         
                        </Typography>
                        <Typography style={{ textAlign:'start', fontSize: '0.7em',}}>
                            Default repository url.
                        </Typography>
                    </Container>
                    <TextField 
                        type="text" 
                        inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                        fullWidth
                        className='input'
                        disabled
                        defaultValue={initialData?.html_url}
                    />
                </BasicFrame>
                <BasicFrame style={{height:'50px'}}>
                    <Container style={{ margin:0, padding:0,}}>
                        <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: 'bold' }}>
                            Project
                        </Typography>
                        <Typography style={{ textAlign:'start', fontSize: '0.7em',}}>
                            Select a project for your repository.
                        </Typography>
                    </Container>

                    {isLoadingProjs && !projects ? (
                        <TextField 
                        type="text" 
                        inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                        fullWidth
                        className='input'
                        disabled
                        defaultValue="Loading projects..."
                    />
                    ) : (
                        <Select
                        value={projData}
                        onChange={(e) => setProjData(+e.target.value)}
                        displayEmpty
                        style={{ width: '100%', height: '100%' }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        {projects?.map((option: Project) => (
                            <MenuItem style={{ width: '100%' }} key={option?.id} value={option?.id}>
                                <p style={{ fontSize: '0.7em', margin: 0 }}>
                                {option?.title}
                                </p>
                            </MenuItem>))}
                            <MenuItem onClick={handleOpen} key={0} value={0}>
                                <p style={{ fontSize: '0.7em', margin: 0 }}>
                                Create a new project
                                </p>
                            </MenuItem>
                    </Select>
                    )}
                </BasicFrame>
            </BasicFrame>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} style={{fontSize: '0.8em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff' }}>Cancelar</Button>
                <Button
                disabled={!selected}
                variant="contained"
                onClick={()=> {handleSave()}}

                sx={{
                    opacity: !selected ? 0.5 : 1, // Reduce la opacidad cuando no está seleccionado
                    '&:disabled': {
                    backgroundColor: 'grey', // Cambia el color de fondo cuando está deshabilitado
                    },
                }}
                style={{marginLeft:'0.5em', fontSize: '0.8em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', color:'#fff', backgroundColor: '#5a7fe7', }}>
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {(loading) && (
                            <CircularProgress 
                                size={24} 
                                sx={{ color: 'white', position: 'absolute' }}
                            />
                        )}
                        <span style={{ visibility: loading ? 'hidden' : 'visible' }}>Connect</span>
                    </Box>
                </Button>
            </DialogActions>
        </BasicFrame>
        <DialogProject open={openDialog} onClose={handleClose} />
    </Dialog>
  );
};

export default DialogRepo;
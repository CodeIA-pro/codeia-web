import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import ButtonValidateUI from '../../common/Button/ButtonValidateUI';
import { useChangeProject, useProjects } from '../../queries/useProject';
import { Project } from '../../interfaces/project/projects.interface';
import { deteleObject } from '../../utils/filtered';
import { ProjectItem } from '../../interfaces/project/project-item.interface';
import { useNotification } from '../../hooks/useNotification';

interface ChangeDialogProps {
  open: boolean;
  onClose: () => void;
  initialData: string;
  dataProj: ProjectItem;
}

  const ChangeDialog: React.FC<ChangeDialogProps> = ({ open, onClose,  initialData, dataProj}) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const {mutate, isLoading: loadingChange} = useChangeProject();
    const [dialogData, setDialogData] = useState<string>('');
    const {isLoading, data, refetch} = useProjects();
    const {getWarning} = useNotification();


  const changeData = (n: string) => {
    setDialogData(n);
    setDisabled(n!=='');
  }  

  const handleSave = () => {
    refetch();
    setDialogData('');
    const repo_origin = data?.find((p: Project) => p.title === initialData)?.id;
    const repo_destiny = data?.find((p: Project) => p.title === dialogData)?.id;
    getWarning('Processing request...');
    mutate({repo_origin: repo_origin, repo_destiny: repo_destiny, project_id: dataProj.id});
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <BasicFrame isCentered={false} className='flex-col' style={{padding:'1em'}}>
        <DialogTitle className='flex items-center justify-start flex-row '>
            <Typography style={{textAlign:'start', fontSize: '0.9em', fontWeight: '400'}}>Change WorkSpace</Typography>
        </DialogTitle>
        <DialogContent style={{paddingBottom: '0.5em'}}>
            <BasicFrame isCentered={false} className='w-full flex-col'>
                <BasicFrame className='mb-4 flex-col pb-3'>
                        <Container style={{ margin:0, padding:0,}}>
                            <Typography style={{ textAlign:'start', fontSize: '0.9em', fontWeight: '500', paddingBottom: '0.6em' }}>
                                Origin
                            </Typography>
                        </Container>
                        <TextField 
                            type="text" 
                            disabled
                            inputProps={{style: {fontSize: 14, fontWeight:'500'}}} // font size of input text
                            fullWidth
                            className='input'
                            defaultValue={initialData}
                        />
                </BasicFrame>
                <BasicFrame className='mb-4 flex-col' style={{height:'50px'}}>
                    <Container style={{ margin:0, padding:0,}}>
                        <Typography style={{ textAlign:'start', fontSize: '0.9em', fontWeight: '500', paddingBottom: '0.6em' }}>
                            Destination
                        </Typography>
                    </Container>

                    {isLoading && !data ? (
                        <TextField 
                        type="text" 
                        inputProps={{style: {fontSize: 13, fontWeight:'500'}}} // font size of input text
                        fullWidth
                        className='input'
                        disabled
                        defaultValue="Loading Projects..."
                    />
                    ) : (
                        <Select
                        value={dialogData}
                        onChange={(e) => changeData(e.target.value)}
                        displayEmpty
                        style={{ width: '100%', height: '100%' }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        { 
                            (data.length > 0) ? (
                                deteleObject(data, initialData)?.map((option: Project) => (
                                    <MenuItem style={{ width: '100%' }} key={option?.id} value={option.title}>
                                        <p style={{ fontSize: '0.7em', margin: 0 }}>
                                            {option?.title}
                                        </p>
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem style={{ width: '100%' }} key={0} value={0}>
                                    <p style={{ fontSize: '0.7em', margin: 0 }}>
                                        No projects found
                                    </p>
                                </MenuItem>
                            )
                        }
                    </Select>
                    )}
                </BasicFrame>
            </BasicFrame>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} style={{fontSize: '0.8em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff' }}>Cancelar</Button>
            <ButtonValidateUI isLoading={isLoading || loadingChange} onClick={handleSave} disabled={disabled} text='Move' style={{backgroundColor: '#5a7fe7', marginRight:'1em'}} />
        </DialogActions>
        </BasicFrame>
    </Dialog>
  );
};

export default ChangeDialog;
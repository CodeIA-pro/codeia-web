import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateProject } from '../../interfaces/project/projects.interface';
import { replaceSpaces } from '../../utils/filtered';
import { useCreateProject, useVerifyNameProject } from '../../queries/useProject';
import { Verify } from '../../interfaces/common/verify.interface';
import { BasicFrame } from '../../common/Frame/BasicFrame';

interface DialogProps {
  open: boolean;
  onClose: () => void;
}

const DialogProject: React.FC<DialogProps> = ({ open, onClose }) => {
  const {isLoading , data: response = {} as Verify, mutate} = useVerifyNameProject();
  const [name, setName] = useState<string>('');
  const { isLoading: loadingProject, mutate: create } = useCreateProject();
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const {register, handleSubmit, formState: { errors }, reset } = useForm<CreateProject>();

  const debouncedSearch = (name: string) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setDebounceTimeout(
      setTimeout(() => {
        setName(name);
        if (name === '') return;
        mutate(name)
      }, 500)
    );
  };

  const closeDialog = () => {
    onClose(); 
    reset({title: '', description: ''}); 
    setName('')
  }

  const handleSave = (data: CreateProject) => {
    if (!loadingProject) {
      create(data);
      closeDialog();
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <div style={{padding:'1em'}}>
            
            <DialogTitle>
                <Typography style={{ textAlign:'start', fontSize: '0.9em', fontWeight: '400', display:'flex', flexDirection:'row', alignItems:'center' }}>
                    Create a new workspace
                </Typography>
            </DialogTitle>
            <DialogContent className='flex items-center justify-center' style={{padding:'0 10px'}}>
                <BasicFrame isCentered={false} className='flex-col justify-start' style={{width:'95%'}}>
                    { name === '' ? null : isLoading ? 
                        <Typography style={{fontSize: '0.8em', color: '#5a7fe7'}}>
                            Verifying name...
                        </Typography> : (response && !response.status) ? 
                        <Typography style={{fontSize: '0.8em', color: '#3fb950'}}>
                            { name } is available.
                        </Typography> : 
                        <Typography style={{fontSize: '0.8em', color: '#f85149'}}>
                            { name } already exists.
                        </Typography> }
                    <TextField
                        fullWidth
                        type="title"
                        label="Title"
                        margin="normal"
                        autoComplete="title"
                        {...register("title", { required: "Title is required",
                        onChange: (e) => {
                            debouncedSearch(replaceSpaces(e.target.value));
                          }
                         })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <TextField
                        fullWidth
                        type="description"
                        label="Description"
                        margin="normal" 
                        placeholder='Optional'
                        multiline // Habilita el comportamiento de área de texto
                        rows={3}  // Define el número de filas visibles
                        autoComplete="description"
                        {...register("description", {})}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                </BasicFrame>
            </DialogContent>
            <DialogActions>
                <BasicFrame isCentered={false} className='justify-end pr-4' style={{width:'90%'}}>
                    <Button onClick={closeDialog} style={{fontSize: '0.8em', borderRadius: '0.7em', width: '90px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff' }}>Cancelar</Button>
                    <Button 
                      onClick={handleSubmit(handleSave)}  
                      disabled={ name === '' || !response || response?.status && !isLoading || isLoading}
                      sx={{
                        opacity: (name === '' || !response || response?.status && !isLoading || isLoading) ? 0.5 : 1, // Reduce la opacidad cuando no está seleccionado
                        '&:disabled': {
                        backgroundColor: 'grey', // Cambia el color de fondo cuando está deshabilitado
                        },
                    }}
                      style={{marginLeft:'0.5em', fontSize: '0.8em',  borderRadius: '0.7em', width: '90px', textTransform: 'none', color:'#fff', backgroundColor: '#5a7fe7', }}>
                      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {loadingProject && (
                            <CircularProgress 
                                  size={24} 
                                  sx={{ color: 'white', position: 'absolute' }}
                              />
                            )}
                        <span style={{ visibility: loadingProject ? 'hidden' : 'visible' }}>Create</span>
                      </Box>
                    </Button>
                </BasicFrame>
            </DialogActions>
        </div>
    </Dialog>
  );
};

export default DialogProject;
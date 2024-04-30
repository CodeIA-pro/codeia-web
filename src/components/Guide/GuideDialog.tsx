import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Checkbox, CircularProgress, Container, Divider, FormControlLabel, FormGroup, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import TypographyFlow from '../../common/Typography/TypographyFlow';
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { Language } from '../../utils/lang.utils';
import { Lang } from '../../interfaces/guide/lang.interface';

import InfoIcon from '@mui/icons-material/Info';
import GuideTheme from './GuideTheme';
import { Sections } from '../../utils/section.utils';
import { arrayToString } from '../../utils/filtered';
import { GenerateGuideContext } from '../../context/GenerateGuide';
import { useAuthStore } from '../../store';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: string) => void;
  initialData: any;
}

const GuideDialog: React.FC<DialogProps> = ({ open, onClose, onSave,  initialData}) => {
  const [lang, setLang] = useState<string>('English');
  const [value, setValue] = React.useState('Classic');
  const { user } = useAuthStore();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(Sections);
  const {mutate} = React.useContext(GenerateGuideContext);

  
  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(o => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSave = () => {
    const data ={
        sections: arrayToString(selectedOptions, Sections),
        token: user?.access,
        project_id: initialData.id,
        lang: lang,
        theme: value,
        owner: initialData.user_repo,
        project_name: initialData.title
    }
    mutate(data);
    onClose();
    onSave(lang);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <BasicFrame isCentered={false} className='w-full p-5 flex-col'>
        <DialogTitle className='flex items-center justify-start flex-row '>
            <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: '400', display:'flex', flexDirection:'row', alignItems:'center' }}>
                Customize&nbsp;  
            </Typography>
            <TypographyFlow style={{fontSize:'0.8em', fontWeight:'bold'}}>Reference Guide</TypographyFlow>
        </DialogTitle>
        <DialogContent>
            <BasicFrame isCentered={false} className='w-full p-1 flex-col'>
                <BasicFrame>
                    <Container style={{ margin:0, padding:0,}}>
                        <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: '500' }}>
                            Language 
                            <Tooltip title="Select the language for the reference guide." placement="right">
                                <InfoIcon style={{ fontSize: '1.1em', marginLeft: '0.3em', color:'#5a7fe7' }}/>
                            </Tooltip>
                        </Typography>
                    </Container>
                        <Select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        displayEmpty
                        style={{ width: '100%', height:'50px' }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                        {Language?.map((option: Lang) => (
                            <MenuItem style={{ width: '100%' }} key={option?.id} value={option?.name}>
                                <p style={{ fontSize: '0.7em', margin: 0 }}>
                                    {option?.name} - {option?.code}
                                </p>
                            </MenuItem>)
                        )}
                    </Select>
                </BasicFrame>
                <Divider style={{padding: '10px'}}/>
                <BasicFrame>
                    <Container style={{ margin:0, padding:0,}}>
                        <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: '500' }}>
                            Theme 
                            <Tooltip title="Select the color theme for the reference guide." placement="right">
                                <InfoIcon style={{ fontSize: '1.1em', marginLeft: '0.3em', color:'#5a7fe7' }}/>
                            </Tooltip>
                        </Typography>
                    </Container>
                    <GuideTheme value={value} changeTheme={handleChange}/>
                </BasicFrame>
                <Divider style={{padding: '10px'}}/>
                <BasicFrame>
                    <Container style={{ margin:0, padding:0,}}>
                        <Typography style={{ textAlign:'start', fontSize: '0.8em', fontWeight: '500' }}>
                            Documentation Sections 
                            <Tooltip title="Select the documentation sections you want to include in the reference guide." placement="right">
                                <InfoIcon style={{ fontSize: '1.1em', marginLeft: '0.3em', color:'#5a7fe7' }}/>
                            </Tooltip>
                        </Typography>
                    </Container>
                    <BasicFrame isCentered={false} className="w-full p-1 flex-col mt-5">
                        <FormGroup>
                        {Sections.map((option, index) => (
                            <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                size="small"
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 18 }, }}
                                checked={selectedOptions.includes(option)}
                                onChange={handleChangeCheck}
                                value={option}
                                />
                            }
                            label={<Typography style={{fontSize:'0.7em', fontWeight:'400', marginBottom:'0.1em'}}>{option}</Typography>}
                            />
                        ))}
                        </FormGroup>
                    </BasicFrame>
                </BasicFrame>
            </BasicFrame>
            </DialogContent>
            <DialogActions style={{paddingInlineEnd: '1.5em', paddingBlockEnd:'0.7rem'}}>
                <Button onClick={onClose} style={{fontSize: '0.8em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#222f4e', color:'#fff' }}>Cancelar</Button>
                <Button
                disabled={ selectedOptions.length === 0 }
                variant="contained"
                onClick={()=> {handleSave()}}

                sx={{
                    opacity: (selectedOptions.length === 0) ? 0.5 : 1, // Reduce la opacidad cuando no está seleccionado
                    '&:disabled': {
                    backgroundColor: 'grey', // Cambia el color de fondo cuando está deshabilitado
                    },
                }}
                style={{marginLeft:'0.5em', fontSize: '0.8em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', color:'#fff', backgroundColor: '#5a7fe7', }}>
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {(false) && (
                            <CircularProgress 
                                size={24} 
                                sx={{ color: 'white', position: 'absolute' }}
                            />
                        )}
                        {/* (false) ? 'hidden' :  */}
                        <span style={{ visibility: 'visible' }}>Generate</span>
                    </Box>
                </Button>
            </DialogActions>
        </BasicFrame>
    </Dialog>
  );
};

export default GuideDialog;
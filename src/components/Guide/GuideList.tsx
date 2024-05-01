import { Fragment, useState } from 'react';
import { Filtered } from "../../utils/filtered";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { Box, Button, Container, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Asset, Guide } from '../../interfaces/guide/guide.interface';
import GuideCompilationDialog from './GuideCompilationDialog';
import { useNavigate } from 'react-router-dom';
import GuideSharedDialog from './GuideSharedDialog';
import LinkIcon from '@mui/icons-material/Link';

interface GuideListProps {
  guide : Guide;
  projects: Asset[] | undefined;
  name?: string;
}

const GuideList: React.FC<GuideListProps> = ({guide, projects, name='' }) => {
  const filtered = Filtered(projects, 'version', name);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSharedDialog, setOpenSharedDialog] = useState(false);

  const [project, setProject] = useState<Asset | undefined>(undefined);
  const [version, setVersion] = useState<string>('');

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleSharedOpen = () => setOpenSharedDialog(true);
  const handleSharedClose = () => setOpenSharedDialog(false);

  const handleNavigate = (version: string) => {
    navigate(`/guide/${guide.user_repo}/${guide.title}/${version}`);
 }

 const handleShare = (project: Asset, version: string) => {
    setProject(project);
    setVersion(version);
    handleSharedOpen();
 }
 
  return (
    <Fragment>
    { filtered.length !== 0 ? 
     (<List style={{ height: '100%', width: '100%', margin:'0', padding:'0' , overflowY: 'auto'}}>
     {filtered?.map((project: Asset) => (
         <ListItem key={project.id} style={{ display: 'flex', justifyContent: 'space-between', height: '3.5em' }}>
          <Box style={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
              <Container style={{ display: 'flex', flexDirection:'row', alignItems: 'center', paddingLeft:0 }}>
                <Typography style={{fontSize: '0.7em'}}>{project.version}v</Typography> &nbsp;
                <ListItemIcon>
                    {(project.is_Loading) ? (
                    <RestartAltIcon style={{color:'#a5c96d', fontSize:'1.2em'}}/>
                    ) : (
                    <CheckBoxIcon style={{color:'#a5c96d', fontSize:'1.2em'}}/>
                    )}
                </ListItemIcon>
                <a href={`${project?.url_commit}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#6c93f1' }}>
                    <Typography style={{ display:'flex', alignItems:'center', cursor: 'pointer', fontSize: '0.7em',}}>
                        {project?.short_sha}
                    </Typography>
                </a>
              </Container>
                <ListItemIcon>
                    <LinkIcon onClick={() =>handleShare(project, project.version)} style={{cursor: 'pointer', color:'#6c93f1', fontSize:'1.1em', marginRight: '0.5em'}}/>
                </ListItemIcon>
          </Box>
          { !project.is_Loading ? 
            (
            <BasicFrame isCentered={false} className="flex-row items-center justify-between">
                <Button variant="contained" onClick={ ()=> handleNavigate(project.version)} style={{fontSize: '0.7em',  borderRadius: '0.7em', textTransform: 'none', backgroundColor:'#1e2f50',  }}>
                        View
                </Button>
                <Button variant="contained" style={{fontSize: '0.7em',  borderRadius: '0.7em', textTransform: 'none', backgroundColor:'#1e2f50', marginLeft:'0.9em'  }}>
                        Donwload
                </Button>
            </BasicFrame>
            ) : 
            (
            <BasicFrame isCentered={false} className="flex-row items-center justify-between">
                <Button variant="contained" onClick={ () => {setProject(project); handleOpen()} } style={{fontSize: '0.7em',  borderRadius: '0.7em', textTransform: 'none', backgroundColor:'#1e2f50',  }}>
                    View compilation
                </Button>
            </BasicFrame>
            )
        }
         </ListItem>
     ))}
 </List>)
    :(
    <BasicFrame className='w-full h-full'>
        <Typography>No guide found</Typography>
    </BasicFrame>) }
    { project && project.subsection.length > 0 &&
        <GuideSharedDialog open={openSharedDialog} onClose={handleSharedClose} initialData={project} version={version}/>
    }
    <GuideCompilationDialog open={openDialog} onClose={handleClose} initialData={project}/>
    </Fragment>);
}

export default GuideList;

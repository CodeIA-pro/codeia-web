import { Fragment, useState } from 'react';
//import { useNavigate } from "react-router-dom";
import { Filtered, timeSince } from "../../utils/filtered";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { Box, Button, Container, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { ProjectItem } from '../../interfaces/project/project-item.interface';
import TypographyFlow from "../../common/Typography/TypographyFlow";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';
import ChangeDialog from '../Project/ChangeDialog';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface WorkSpaceListProps {
  params?: string | undefined;
  projects: ProjectItem | undefined;
  name?: string;
}

const WorkSpaceList: React.FC<WorkSpaceListProps> = ({params, projects, name='' }) => {
  const filtered = Filtered(projects, 'title', name);
  const navigate = useNavigate();
  const openGuide = (user_repo: string, title: string) => navigate(`/info/${user_repo}/${title}`);

  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState<ProjectItem>({} as ProjectItem);
  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const data = (i: ProjectItem) => {
    setItem(i);
    handleOpen();
  }

  return (
    <Fragment>
    { filtered.length !== 0 ? 
     (<List style={{ height: '100%', width: '100%', margin:'0', padding:'0' , overflowY: 'auto'}}>
     {filtered?.map((project: ProjectItem) => (
         <ListItem key={project.id} style={{ display: 'flex', justifyContent: 'space-between', height: '3.5em' }}>
         <Box style={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
             <ListItemIcon>
                 <GitHubIcon />
             </ListItemIcon>
             <Container style={{ display: 'flex', flexDirection:'row', alignItems: 'center', paddingLeft:0 }}>
               <TypographyFlow>{project.title}</TypographyFlow>
               <Typography style={{fontSize: '0.7em', paddingLeft:'0.2em'}}>• {timeSince(project?.latest_build)}</Typography>
             </Container>
             <ListItemIcon style={{cursor:'pointer'}} onClick={() => data(project)}>
                 <SwapHorizIcon />
             </ListItemIcon>
         </Box>
         <Button onClick={() => openGuide(project.user_repo, project.title)} variant="contained" style={{fontSize: '0.7em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#5a7fe7' }}>
                Open
         </Button>
         </ListItem>
     ))}
 </List>)
    :(
    <BasicFrame className='w-full h-full'>
        <Typography>No project found</Typography>
    </BasicFrame>)}
    {params && <ChangeDialog initialData={params} onClose={handleClose} open={openDialog} dataProj={item}/>}
    </Fragment>);
}

export default WorkSpaceList;

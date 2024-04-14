import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { Filtered, timeSince } from "../../utils/filtered";
import TypographyFlow from "../../common/Typography/TypographyFlow";
import { UserGithub } from "../../interfaces/github/user-github.interface";
import { ProjectGithub } from "../../interfaces/github/projects-github.interface";
import { BasicFrame } from "../../common/Frame/BasicFrame";

import { Box, Button, Container, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LockIcon from '@mui/icons-material/Lock';

interface RepoListProps {
  github: UserGithub;
  projects: ProjectGithub;
  name?: string;
}

const RepoList: React.FC<RepoListProps> = ({github, projects, name='' }) => {

  const filtered = Filtered(projects, 'name', name);
  const navigate = useNavigate();
  const navigateToInfo = (user: any, project: any) => navigate(`/info/${user}/${project}`);

  return (
    <Fragment>
    { filtered.length !== 0 ? 
     (<List style={{ height: '100%', width: '100%', margin:'0', padding:'0' , overflowY: 'auto'}}>
     {filtered?.map((project: ProjectGithub) => (
         <ListItem key={project.id} style={{ display: 'flex', justifyContent: 'space-between', height: '3.5em' }}>
         <Box style={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
             <ListItemIcon>
                 <GitHubIcon />
             </ListItemIcon>
             <Container style={{ display: 'flex', flexDirection:'row', alignItems: 'center', paddingLeft:0 }}>
               <TypographyFlow>{github.login} / {project.name}</TypographyFlow>
               <Typography>{(project.visibility === 'private') && <LockIcon style={{height: '0.6em'}} />}</Typography>
               <Typography>{(project.owner.login !== github.login) && <CorporateFareIcon style={{height: '0.6em'}} />}</Typography>
               <Typography style={{fontSize: '0.7em', paddingLeft:'0.2em'}}>• {timeSince(project?.updated_at)}</Typography>
             </Container>
           
         </Box>
         {(project?.isProject) ? 
         (
           <Button variant="contained" onClick={() => navigateToInfo(project.owner.login, project.name)} style={{fontSize: '0.7em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#5a7fe7' }}>
               View
           </Button>
         ) 
         : (
           <Button variant="contained" style={{fontSize: '0.7em',  borderRadius: '0.7em', width: '82px' , textTransform: 'none', backgroundColor:'#1e2f50' }}>
               Connect
           </Button>
         ) 
         }
         </ListItem>
     ))}
 </List>)
    :(
    <BasicFrame className='w-full h-full'>
        <Typography>No projects found</Typography>
    </BasicFrame>)}
    </Fragment>);
}

export default RepoList;

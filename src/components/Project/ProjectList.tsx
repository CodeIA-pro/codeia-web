import { Fragment } from 'react';
import { Filtered, timeSince } from "../../utils/filtered";
import { useNavigate } from 'react-router-dom';
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { Project } from '../../interfaces/project/projects.interface';

import { Box, Button, Container, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import TypographyFlow from "../../common/Typography/TypographyFlow";
import FolderOpen from '@mui/icons-material/FolderOpen';

interface ProjectListProps {
  projects: Project;
  name?: string;
}

const ProjectList: React.FC<ProjectListProps> = ({projects, name='' }) => {
  const filtered = Filtered(projects, 'title', name);
  const navigate = useNavigate();
  const handleNavigate = (name: string) => navigate(`/workspace/${name}`);
  
  return (
    <Fragment>
    { filtered.length !== 0 ? 
     (<List style={{ height: '100%', width: '100%', margin:'0', padding:'0' , overflowY: 'auto'}}>
     {filtered?.map((project: Project) => (
         <ListItem key={project.id} style={{ display: 'flex', justifyContent: 'space-between', height: '3.5em' }}>
         <Box style={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
             <ListItemIcon>
                 <FolderOpen />
             </ListItemIcon>
             <Container style={{ display: 'flex', flexDirection:'row', alignItems: 'center', paddingLeft:0 }}>
               <TypographyFlow>{project.title}</TypographyFlow>
               <Typography style={{fontSize: '0.7em', paddingLeft:'0.2em'}}>• {timeSince(project?.created_at)}</Typography>
             </Container>
         </Box>
         {(project.project_count > 0) ? 
         (
           <Button variant="contained" onClick={() => handleNavigate(project.title)} style={{fontSize: '0.7em',  borderRadius: '0.7em', width: '82px', textTransform: 'none', backgroundColor:'#5a7fe7' }}>
               Open
           </Button>
         ) 
         : (
           <Typography style={{fontSize: '0.7em',  borderRadius: '0.7em', width: '82px' , textTransform: 'none', }}>
               No content
              </Typography>
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

export default ProjectList;
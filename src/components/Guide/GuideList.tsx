import { Fragment } from 'react';
import { Filtered } from "../../utils/filtered";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { Box, Button, Container, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import TypographyFlow from "../../common/Typography/TypographyFlow";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Asset } from '../../interfaces/guide/guide.interface';

interface GuideListProps {
  projects: Asset[] | undefined;
  name?: string;
}

const GuideList: React.FC<GuideListProps> = ({projects, name='' }) => {
  const filtered = Filtered(projects, 'version', name);
  return (
    <Fragment>
    { filtered.length !== 0 ? 
     (<List style={{ height: '100%', width: '100%', margin:'0', padding:'0' , overflowY: 'auto'}}>
     {filtered?.map((project: Asset) => (
         <ListItem key={project.id} style={{ display: 'flex', justifyContent: 'space-between', height: '3.5em' }}>
          <Box style={{ display: 'flex', flexDirection:'row', alignItems: 'center' }}>
              <Container style={{ display: 'flex', flexDirection:'row', alignItems: 'center', paddingLeft:0 }}>
              <TypographyFlow>{project.version}&nbsp;</TypographyFlow>
              <ListItemIcon>
                  <CheckBoxIcon style={{color:'#a5c96d', width:'20px', height:'20px'}}/>
              </ListItemIcon>
              <a href={`${project?.url_commit}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#6c93f1' }}>
                  <Typography style={{ display:'flex', alignItems:'center', cursor: 'pointer', fontSize: '0.7em',}}>
                      {project?.short_sha}
                  </Typography>
              </a>
              </Container>
          </Box>
          <BasicFrame isCentered={false} className="flex-row items-center justify-between">
              <Button variant="contained" style={{fontSize: '0.7em',  borderRadius: '0.7em', textTransform: 'none', backgroundColor:'#1e2f50',  }}>
                      View
              </Button>
              <Button variant="contained" style={{fontSize: '0.7em',  borderRadius: '0.7em', textTransform: 'none', backgroundColor:'#1e2f50', marginLeft:'0.9em'  }}>
                      Donwload
              </Button>
            </BasicFrame>
         </ListItem>
     ))}
 </List>)
    :(
    <BasicFrame className='w-full h-full'>
        <Typography>No guide found</Typography>
    </BasicFrame>)}
    </Fragment>);
}

export default GuideList;

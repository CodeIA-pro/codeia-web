import { useEffect, useState } from 'react';
import { Asset } from "../../interfaces/guide/guide.interface";
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { Button, Container, List, ListItem, TextField, Typography } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SendIcon from '@mui/icons-material/Send';
import GuideDialogSuggestion from './GuideDialogSuggestion';
import GuideDialogComment from './GuideDialogComment';

interface GuideNavbarProps {
    data: Asset;
    guideText: (text: string) => void;
  }
  
const GuideNavbar: React.FC<GuideNavbarProps> = ({data, guideText}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogComment, setOpenDialogComment] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(timerId);

      }, [searchTerm]);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const handleOpenComment = () => setOpenDialogComment(true);
    const handleCloseComment = () => setOpenDialogComment(false);

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
        };

    const filteredVersion = data && data.subsection 
        ? (searchTerm === '') ? data.subsection : 
        data.subsection.filter((item: Asset) => item.description.toLowerCase().includes(searchTerm.toLowerCase())) : []; 

    return (
            <BasicFrame isCentered={false}  className='justify-start flex-col' style={{width: '400px',backgroundColor:'#333131' }} >
                    <BasicFrame  style={{ height:'160px', backgroundColor:'#517daf' }}>
                        <Container style={{display:'flex', flexDirection:'column', justifyItems:'center', alignItems:'center', padding:0, }}>
                            <Typography  style={{ color:'#fff', paddingTop:'1em', paddingBottom:'0.5em', display:'flex', alignItems:'center', justifyItems:'center'}}>
                            <HomeWorkIcon style={{ fontSize:'1em', color:'#fff'}}/>
                            &nbsp;
                            {data?.titulo}
                            &nbsp;
                            {data?.version}
                            </Typography>
                            <Typography  style={{ color:'#7c98bd', paddingBottom:'1em'}}>
                                stable
                            </Typography>
                            <TextField 
                            variant="outlined" 
                            placeholder="Search docs"
                            value={searchTerm} 
                            onChange={handleSearch}
                            sx={{ 
                                width: '90%',
                                input: { 
                                    fontSize: '0.9rem', 
                                    backgroundColor: 'white',
                                    borderRadius: '2em', 
                                    padding: '0.5em 1em',
                                },
                                fieldset: {
                                    borderRadius: '1.4em',
                                }
                            }}
                            
                        />
                        </Container>
                    </BasicFrame>
                    <BasicFrame isCentered={false} style={{backgroundColor:'#333131', display:'flex', flexDirection:'column', alignContent:'space-between' }}>
                        <Container style={{padding:'1.5em', color:'#fff', display:'flex', flexDirection:'column', justifyItems:'center'}}>
                            <Typography style={{ paddingBottom:'0.3em', color:'#7c98bd' }}>
                                TABLE OF CONTENTS:
                            </Typography>
                            <List>
                                {filteredVersion?.map((items: Asset) => (
                                    <ListItem key={items.id} style={{ padding:'0.4em 0', fontSize: '0.9em', fontWeight:'300' }}>
                                        <span style={{ cursor:'pointer',}} onClick={() => guideText(items?.description)}>
                                            {items?.titulo}
                                        </span>
                                    </ListItem>
                                ))} 
                            </List>
                        </Container>
                        <div style={{padding:'1.5em', color:'#fff', display:'flex', flexDirection:'column', justifyItems:'end', alignContent:'end'}}>
                            <Typography style={{ paddingBottom:'0.3em', color:'#7c98bd', textAlign:'start' }}>
                                HELP US TO IMPROVE:
                            </Typography>
                            <Typography style={{ paddingBottom:'0.3em', color:'#fff', textAlign:'start' }}>
                                Was this guide helpful?
                            </Typography>
                            <Button onClick={handleOpen} style={{marginTop:'0.3em', backgroundColor:'#333131', padding:'0', color:'#fff' , display:'flex', alignItems:'center', cursor:'pointer', width:'150px'}}>
                                <SendIcon style={{ fontSize:'1em', color:'#fff'}}/>
                                &nbsp;
                                Send feedback
                            </Button>
                            <Button onClick={handleOpenComment} style={{marginTop:'0.3em', backgroundColor:'#333131', padding:'0', color:'#fff' , display:'flex', alignItems:'center', cursor:'pointer', width:'152px'}}>
                                <SendIcon style={{ fontSize:'1em', color:'#fff'}}/>
                                &nbsp;
                                Send Comment
                            </Button>
                        </div>
                    </BasicFrame>
                    <GuideDialogSuggestion open={openDialog} onClose={handleClose} />
                    <GuideDialogComment open={openDialogComment} onClose={handleCloseComment} />
            </BasicFrame>);
    }

export default GuideNavbar;
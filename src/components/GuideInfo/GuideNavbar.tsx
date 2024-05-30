import { useEffect, useState } from 'react';
import { Asset } from "../../interfaces/guide/guide.interface";
import { BasicFrame } from '../../common/Frame/BasicFrame';
import { Button, Container, List, ListItem, TextField, Typography } from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SendIcon from '@mui/icons-material/Send';
import GuideDialogSuggestion from './GuideDialogSuggestion';
import GuideDialogComment from './GuideDialogComment';
import Rating from '@mui/material/Rating';
import { useStar } from '../../queries/useGuide';

interface GuideNavbarProps {
    data: Asset;
    guideText: (text: string) => void;
  }
  
const GuideNavbar: React.FC<GuideNavbarProps> = ({data, guideText}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [flag, setFlag] = useState(false);
    const [openDialogComment, setOpenDialogComment] = useState(false);
    const {mutate} = useStar();
    const [star, setStar] = useState<number | null>(0);

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

    const handleStar = (value: number | null) => {
            if(value){
                setStar(value);
                mutate({asset_id: data.id, star: value});
                setFlag(true);
            }
        };

    const filteredVersion = data && data.subsection 
        ? (searchTerm === '') ? data.subsection : 
        data.subsection.filter((item: Asset) => item.description.toLowerCase().includes(searchTerm.toLowerCase())) : []; 

    return (
            <BasicFrame isCentered={false}  className='absolute left-0 flex flex-col md:static md:justify-start 
                w-full md:w-96' style={{width: '400px',backgroundColor:'#333131' }} >
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
                        <Container style={{padding:'1.5em 1.5em 0 1.5em', color:'#fff', display:'flex', flexDirection:'column', justifyItems:'center'}}>
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
                        <BasicFrame isCentered={false} className='flex-col justify-end item-end' style={{padding:'1.5em', color:'#fff'}}>
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
                            <BasicFrame isCentered={false} className='flex-col justify-center items-start pt-7'>
                                <Typography style={{color:'#fff', fontSize:'1em'}}>
                                    <span style={{color:'#7c98bd'}}>ASSESSMENT:</span> <br></br>
                                    <Rating
                                        name="simple-controlled"
                                        style={{fontSize:'1.2em'}}
                                        disabled={flag}
                                        value={star}
                                        onChange={(event, newValue) => {
                                            console.log(event);
                                            handleStar(newValue);
                                        }}
                                    />
                                </Typography>
                                <Typography style={{color:'#fff', fontSize:'1em', paddingTop:'0.5em'}}>
                                    <span style={{color:'#7c98bd'}}>STAR RATING:</span> <br></br>
                                    <Rating name="read-only" 
                                        readOnly 
                                        style={{fontSize:'1.2em'}}
                                        value={data?.star_average}
                                        /> <span style={{fontSize:'0.8em', color:'#7c98bd'}}>  ({data?.start_quantity})</span>
                                </Typography>
                            </BasicFrame> 
                        </BasicFrame>
                    </BasicFrame>
                    <GuideDialogSuggestion open={openDialog} onClose={handleClose} />
                    <GuideDialogComment open={openDialogComment} onClose={handleCloseComment} />

            </BasicFrame>);
    }

export default GuideNavbar;
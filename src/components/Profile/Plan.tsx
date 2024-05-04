import { Box, Button, Divider, Typography } from "@mui/material";
import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { useState } from "react";
import { useUser } from "../../queries/useUser";
import SecurityDialog from "./SecurityDialog";

const PlanSubscription: React.FC = () => {
    const {isLoading,} = useUser();
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em', boxShadow:'0' }}>
            <Box className=" flex items-start place-content-between">
                <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>My Plan</Typography>
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            <BasicFrame isCentered={false} className="items-start flex-col">
                <BasicFrame isCentered={false} className="items-center justify-between mb-2 w-full">
                    <Box sx={{textAlign:'start' }}>
                        <Typography style={{fontSize:'0.7em', fontWeight:'400'}}>Due date: 03/08/2024</Typography>
                        <BasicFrame isCentered={false} className="p-10 justify-center items-start flex-col cardPricing mt-3" style={{maxWidth:'500px', height:'100px'}}>
                            <Typography className="text-white" style={{fontSize:'1.2em', fontWeight:'700' }}>CodeIA Enterprise</Typography>
                            <Typography className="text-white" style={{fontSize:'0.8em', fontWeight:'300'}}>Unlimited API docs power</Typography>
                        </BasicFrame>
                    </Box>
                    <BasicFrame isCentered={false} className=" items-end justify-center flex-col" style={{width:'284px',}}>
                        <Button onClick={handleOpen} disabled={isLoading} style={{textTransform:'none', fontSize:'0.75em', color:'#fff', backgroundColor: '#ff5c88', width:'180px', height:'40px'}}>Cancel plan</Button>
                        <Button onClick={handleOpen} disabled={isLoading} variant="outlined" style={{textTransform:'none', fontSize:'0.75em', width:'180px', height:'40px', marginTop:'0.8em',}}>Change plan</Button>
                    </BasicFrame>
                </BasicFrame>
                
            </BasicFrame>
            <SecurityDialog open={openDialog} onClose={handleClose}/>
        </GenericPaper>
    );
}

export default PlanSubscription;
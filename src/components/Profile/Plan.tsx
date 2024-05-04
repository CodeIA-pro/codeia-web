import { useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { useCancelSubscribe, useSubscription } from "../../queries/useSubscription";
import Progress from "../../common/Progress/Progress";
import ChangePlanDialog from "../Plan/ChangePlanDialog";
import { useNotification } from "../../hooks/useNotification";

const PlanSubscription: React.FC = () => {
    const {mutate: cancel, isLoading: isCancel} = useCancelSubscribe();
    const {data, isLoading} = useSubscription();
    const [openDialog, setOpenDialog] = useState(false);
    const {getWarning} = useNotification();

    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const handleCancel = () => {
        getWarning('Canceling plan');
        cancel();
    }

    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em', boxShadow:'0', height:'284px' }}>
            <Box className=" flex items-start place-content-between">
                <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>My Plan</Typography>
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            <BasicFrame isCentered={false} className="items-start flex-col">
                <BasicFrame isCentered={false} className="items-center justify-between mb-2 w-full">
                    <Box sx={{textAlign:'start' }}>
                        {
                            isLoading ?
                            <div></div>
                            :
                            !data?.status ?
                            <Typography style={{fontSize:'0.8em', fontWeight:'500'}}>Due date: <span style={{ fontWeight:'400'}}>Does not expire</span></Typography>
                            :
                            <Typography style={{fontSize:'0.8em',fontWeight:'500'}}>Due date: <span style={{ fontWeight:'400'}}>{data.due_date}</span></Typography>
                        }
                        { isLoading ?
                            <BasicFrame isCentered={false} className="p-10 justify-center items-start flex-col mt-3" style={{height:'100px', width:'300px'}}>
                                <Progress/>
                            </BasicFrame>
                            :
                            <BasicFrame isCentered={false} className={`p-10 justify-center items-center flex-col ${data?.className} mt-3`} style={{height:'100px', width:'285px', backgroundColor: '#111623', borderRadius: '.5em',}}>
                                <Box sx={{display:'flex', justifyContent:'center', alignItems:'start', flexDirection:'column'}}>
                                    <Typography className="text-white" style={{fontSize:'1.2em', fontWeight:'700' }}>{data?.plan_title}</Typography>
                                    <Typography className="text-white" style={{fontSize:'0.8em', fontWeight:'300'}}>{data?.subtitle}</Typography>
                                </Box>
                                
                            </BasicFrame>
                        }

                    </Box>
                    <BasicFrame isCentered={false} className=" items-end justify-center flex-col" style={{width:'284px',}}>
                        { data && data?.status && <Button onClick={handleCancel} disabled={isLoading || isCancel} style={{textTransform:'none', fontSize:'0.75em', color:'#fff', backgroundColor: '#ff5c88', width:'180px', height:'40px', marginBottom:'0.8em',}}>Cancel plan</Button>}
                        <Button onClick={handleOpen} disabled={isLoading} variant="outlined" style={{textTransform:'none', fontSize:'0.75em', width:'180px', height:'40px'}}>Change plan</Button>
                    </BasicFrame>
                </BasicFrame>
                
            </BasicFrame>
            <ChangePlanDialog open={openDialog} onClose={handleClose}/>
        </GenericPaper>
    );
}

export default PlanSubscription;
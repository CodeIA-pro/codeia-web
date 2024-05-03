import { Box, Button, CircularProgress, Divider, FormControlLabel, FormGroup, Typography } from "@mui/material";
import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import SwitchUI from "../../common/Switch/Switch";
import { useEffect, useState } from "react";
import { useTwoFactorChange, useUser } from "../../queries/useUser";

const Security: React.FC = () => {
    const {isLoading, data} = useUser();
    const [checked, setChecked] = useState(false);
    const {isLoading: change, mutate} = useTwoFactorChange();

    useEffect(() => {
        if(data && data.two_factor){
            setChecked(data.two_factor);
        }
    }, [data, isLoading])

    const handleChange = (event: any, checked: boolean) => {
        console.log(event, checked)
        setChecked(checked);
        mutate();
    }

    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em', boxShadow:'0' }}>
            <Box className=" flex items-start place-content-between">
                <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>Security</Typography>
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            <BasicFrame isCentered={false} className="items-start flex-col">
                <BasicFrame isCentered={false} className="items-center justify-between mb-6 w-full">
                    <Typography style={{fontSize:'0.7em', fontWeight:'400'}}>Password</Typography>
                    <Button disabled={isLoading} variant="outlined" style={{textTransform:'none', fontSize:'0.65em',}}>Change Password</Button>
                </BasicFrame>

                <BasicFrame isCentered={false} className="items-center justify-between mb-2 w-full">
                    <Box sx={{textAlign:'start' }}>
                        <Typography style={{fontSize:'0.7em', fontWeight:'400'}}>Two-Factor Authentication</Typography>
                        <Typography style={{fontSize:'0.7em', fontWeight:'300'}}>CodeIA uses time-based one-time passcodes (TOTP) that are compliant with all major authenticator apps.</Typography>
                    </Box>
                    <Box sx={{display:'flex' , alignItems:'center', justifyContent:'start' }}>
                        {
                            change || isLoading ?
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {(change) && (
                                    <CircularProgress 
                                        size={24} 
                                        sx={{ color: '#19242e', position: 'absolute' }}
                                    />
                                )}
                            </Box>
                            : data && data.two_factor ?
                            <Typography style={{fontSize:'0.7em', fontWeight:'500'}}>Enable</Typography>
                            :
                            <Typography style={{fontSize:'0.7em', fontWeight:'500'}}>Disable</Typography>
                        }
                    
                        <FormGroup className="ml-7">
                            <FormControlLabel control={<SwitchUI disabled={isLoading || change} checked={checked} handleChange={handleChange} />} label=""/>
                        </FormGroup>
                    </Box>
                </BasicFrame>
            </BasicFrame>
        </GenericPaper>
    );
}

export default Security;
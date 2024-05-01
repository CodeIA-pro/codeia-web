import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";

const Profile: React.FC = () => {
    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em'}}>
            <Box className=" flex items-start place-content-between">
                <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>Profile</Typography>
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            <BasicFrame isCentered={false} className="items-start flex-col">
                <BasicFrame isCentered={false} className="items-center justify-center mb-7">
                    <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>CONTACT EMAIL</Typography>
                    <Box className="flex pl-24" >
                        <Typography style={{fontSize:'0.8em', fontWeight:'400', marginRight:'16px'}}> miguelalfaro2017@gmail.com</Typography>
                        <Button variant="outlined" style={{textTransform:'none', fontSize:'0.65em', padding:'0' }}>Edit</Button>
                    </Box>
                </BasicFrame>

                <BasicFrame isCentered={false} className="items-center justify-center mb-7">
                    <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>GITHUB LOGIN</Typography>
                    <Box className="flex pl-24" >
                        <Typography style={{fontSize:'0.8em', fontWeight:'400', marginRight:'16px'}}>ShoLee01</Typography>
                        <Button variant="outlined" style={{textTransform:'none', fontSize:'0.65em', padding:'1px 15px' }}>Disconnect</Button>
                    </Box>
                </BasicFrame>

                <BasicFrame isCentered={false} className="items-center justify-center mb-7">
                    <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>CONTACT EMAIL</Typography>
                    <Box className="flex pl-24" >
                        <TextField
                            fullWidth
                            type="text"
                            defaultValue="Miguel Alfaro"
                            sx={{
                                borderRadius: '.375rem',
                                '& .MuiOutlinedInput-input': {
                                  padding: '8px 12px',
                                }
                            }}
                        />
                    </Box>
                </BasicFrame>

                <BasicFrame isCentered={false} className="items-center justify-center">
                    <Button variant="contained" style={{textTransform:'none', fontSize:'0.65em', }}>Save Changes</Button>
                </BasicFrame>
            </BasicFrame>
        </GenericPaper>
    );
}

export default Profile;
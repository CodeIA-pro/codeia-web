import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";

const Security: React.FC = () => {
    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em', boxShadow:'0' }}>
            <Box className=" flex items-start place-content-between">
                <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>Security</Typography>
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            <BasicFrame isCentered={false} className="items-start flex-col">
                <BasicFrame isCentered={false} className="items-center justify-center mb-6">
                    <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>CONTACT EMAIL</Typography>
                    <Box className="flex" sx={{marginLeft: '4em'}}>
                        <Typography style={{fontSize:'0.8em', fontWeight:'400', marginRight:'16px'}}> miguelalfaro2017@gmail.com</Typography>
                        <Button variant="outlined" style={{textTransform:'none', fontSize:'0.65em', padding:'0' }}>Edit</Button>
                    </Box>
                </BasicFrame>

                <BasicFrame isCentered={false} className="items-center justify-center mb-6">
                    <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>GITHUB LOGIN</Typography>
                    <Box className="flex" sx={{marginLeft: '4.5em'}}>
                        <Typography style={{fontSize:'0.8em', fontWeight:'400', marginRight:'16px'}}>ShoLee01</Typography>
                        <Button variant="outlined" style={{textTransform:'none', fontSize:'0.65em', padding:'1px 15px' }}>Disconnect</Button>
                    </Box>
                </BasicFrame>

                <BasicFrame isCentered={false} className="items-center justify-center mb-6">
                    <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>NAME</Typography>
                    <Box className="flex" sx={{marginLeft: '7.2em'}}>
                        <TextField
                            fullWidth
                            type="text"
                            defaultValue="Miguel"
                            sx={{
                                
                                borderRadius: '.375rem',
                                '& .MuiOutlinedInput-input': {
                                  padding: '8px 12px',
                                  width: '290px',
                                }
                            }}
                        />
                    </Box>
                </BasicFrame>

                
                <BasicFrame isCentered={false} className="items-center justify-center mb-6">
                    <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>SURNAME</Typography>
                    <Box className="flex" sx={{marginLeft: '6em'}}>
                        <TextField
                            fullWidth
                            type="text"
                            defaultValue="Alfaro"
                            sx={{
                                borderRadius: '.375rem',
                                '& .MuiOutlinedInput-input': {
                                  padding: '8px 12px',
                                  width: '290px'
                                }
                            }}
                        />
                    </Box>
                </BasicFrame>

                <BasicFrame isCentered={false} className="items-center justify-center">
                    <Button variant="contained" style={{textTransform:'none', fontSize:'0.65em', borderRadius:'6px' }}>Save Changes</Button>
                </BasicFrame>
            </BasicFrame>
        </GenericPaper>
    );
}

export default Security;
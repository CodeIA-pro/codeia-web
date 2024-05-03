import { Fragment, useState } from "react";
import { Box, Button, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import GenericPaper from "../../common/Container/GenericPaper";
import { BasicFrame } from "../../common/Frame/BasicFrame";
import { useUpdateUser, useUser } from "../../queries/useUser";
import Progress from "../../common/Progress/Progress";
import { validateEmail } from "../../utils/filtered";
import ProfileGithubDialog from "./ProfileGithubDialog";
import { loginWithGithub } from "../../utils/github";

interface Profile {
    email?: string;
    name?: string;
    surname?: string;
}

const Profile: React.FC = () => {
    const {isLoading, data} = useUser();
    const {mutate, isLoading: update} = useUpdateUser();
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const email_data = email !== '' && data && email !== data?.email && !validateEmail(email);
    const name_data = name !== '' && data && name !== data?.name;
    const surname_data = surname !== '' && data && surname !== data?.surname;
    
    const handleOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);
    
    const check = () =>  !(email_data || name_data || surname_data);
    const handleSaveChanges = () => {
        const user: Profile = {};
        if(email_data) user.email = email;
        if(name_data) user.name = name;
        if(surname_data) user.surname = surname;
        mutate(user);
    }

    return (
        <GenericPaper style={{borderRadius:'.375rem', width: '90vw', maxWidth: '1046px', minHeight: '100px', padding:'1.8em', boxShadow:'0'}}>
            <Box className=" flex items-start place-content-between">
                <Typography style={{fontWeight:'500', fontSize:'1.1em'}}>Profile</Typography>
            </Box>
            <Divider style={{marginBottom:'24px', paddingTop:'20px'}}/>
            {
                isLoading ?  
                <BasicFrame className="w-full" style={{height:'254px'}}>
                    <Progress/>
                </BasicFrame>
                :
                <BasicFrame isCentered={false} className="items-start flex-col">
                    <BasicFrame isCentered={false} className="items-center justify-center mb-6">
                        <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>CONTACT EMAIL</Typography>
                        <Box className="flex" sx={{marginLeft: '4em'}}>
                            {   isEditing ?
                                <TextField
                                fullWidth
                                type="email"
                                defaultValue={data?.email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    marginRight:'16px',
                                    borderRadius: '.375rem',
                                    '& .MuiOutlinedInput-input': {
                                        padding: '8px 12px',
                                        width: '290px'
                                    }
                                }}
                                />
                                :
                                <Typography style={{fontSize:'0.8em', fontWeight:'400', marginRight:'16px'}}> miguelalfaro2017@gmail.com</Typography>
                            }
                            {
                                isEditing ?
                                <Button variant="contained" onClick={() => {setIsEditing(false); setEmail('')}} style={{textTransform:'none', fontSize:'0.65em', padding:'0' }}>Cancel</Button>
                                :
                                <Button variant="outlined" onClick={() => setIsEditing(true)} style={{textTransform:'none', fontSize:'0.65em', padding:'0' }}>Edit</Button>
                            }
                        </Box>
                    </BasicFrame>

                    <BasicFrame isCentered={false} className="items-center justify-center mb-6">
                        <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>GITHUB LOGIN</Typography>
                        <Box className="flex" sx={{marginLeft: '4.5em'}}>
                            {   data?.repo_login ?
                                <Fragment>
                                    <Typography style={{fontSize:'0.8em', fontWeight:'400', marginRight:'16px'}}>ShoLee01</Typography>
                                    <Button onClick={handleOpen} variant="outlined" style={{textTransform:'none', fontSize:'0.65em', padding:'1px 15px' }}>Disconnect</Button>
                                </Fragment>
                                :
                                <Fragment>
                                    <Button onClick={loginWithGithub} variant="outlined" style={{textTransform:'none', fontSize:'0.65em', padding:'1px 15px' }}>Connect</Button>
                                </Fragment> 
                            }
                        </Box>
                    </BasicFrame>

                    <BasicFrame isCentered={false} className="items-center justify-center mb-6">
                        <Typography style={{fontSize:'0.65em', fontWeight:'400', color:'#7d8fb1'}}>NAME</Typography>
                        <Box className="flex" sx={{marginLeft: '7.2em'}}>
                            <TextField
                                fullWidth
                                type="text"
                                defaultValue={data?.name}
                                onChange={(e) => setName(e.target.value)}
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
                                defaultValue={data?.surname}
                                onChange={(e) => setSurname(e.target.value)}
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
                        {
                            !update ?
                            <Button
                                disabled={check()}
                                variant="contained"
                                onClick={()=> {handleSaveChanges()}}
                                sx={{
                                    opacity: (check()) ? 0.5 : 1,
                                    '&:disabled': {
                                    backgroundColor: 'grey',
                                    },
                                }}
                                style={{textTransform:'none', fontSize:'0.65em', borderRadius:'6px' }}>
                                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {(false) && (
                                            <CircularProgress 
                                                size={24} 
                                                sx={{ color: 'white', position: 'absolute' }}
                                            />
                                        )}
                                        <span style={{ color: 'white' }}>Save Changes</span>
                                </Box>
                            </Button>
                            :
                            <Button
                                disabled
                                sx={{
                                    opacity: 0.5,
                                    '&:disabled': {
                                    backgroundColor: 'grey',
                                    },
                                }}
                                style={{textTransform:'none', fontSize:'0.65em', borderRadius:'6px', height:'32px', width:'109px' }}>
                                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {(true) && (
                                            <CircularProgress 
                                                size={19} 
                                                sx={{ color: 'white', position: 'absolute' }}
                                            />
                                        )}
                                    </Box>
                            </Button>
                        }

                    </BasicFrame>
                </BasicFrame>
            }
            <ProfileGithubDialog open={openDialog} onClose={handleClose} />
        </GenericPaper>
    );
}

export default Profile;
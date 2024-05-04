import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    AppBar, 
    Toolbar, 
    Container, 
    Grid, 
    Typography, 
    Button, Stack, 
    IconButton, 
    Menu, 
    MenuItem 
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuthStore } from '../../store';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './new.css';

export const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const { user, logout } = useAuthStore();


    const handleProfileMenuOpen = (event: any) => setAnchorEl(event.currentTarget);
    const handleProfile = () => navigate('/profile');
    const handleLogout = () => {
        navigate('/login');
        logout();
    }
    const handleSelectRepo = () => {
        setTimeout(() => {
            navigate('/connection');
        }, 200);
    };

    return (
        <Box position="fixed" sx={{ flexGrow: 1, zIndex:1000 }}>
            <AppBar >
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid 
                            container 
                            direction="row" 
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography onClick={() => navigate('/')} fontSize="1.2em" fontWeight="500" style={{cursor: 'pointer'}}> CodeIA </Typography>
                            </Grid>

                            <Grid item style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                                <Typography onClick={() => navigate('/')} fontSize="1em" fontWeight="300" style={{cursor: 'pointer', padding:'0em 2em'}}> Home </Typography>
                                { !user ?
                                    <Fragment>
                                        <Typography onClick={() => navigate('/#feature')} fontSize="1em" fontWeight="300" style={{cursor: 'pointer', padding:'0em 2em'}}> Features </Typography>
                                        <Typography onClick={() => navigate('/pricing/#plans')} fontSize="1em" fontWeight="300" style={{cursor: 'pointer', padding:'0em 2em'}}> Plans </Typography>
                                    </Fragment>
                                    : <div></div>
                                }
                                {user != null ? (<Typography onClick={() => navigate('/projects')} fontSize="1em" fontWeight="300" style={{cursor: 'pointer', padding:'0em 2em'}}> Projects </Typography>) : (<div></div>)}
                            </Grid>
                            <Grid item>
                                {user != null ? (
                                    <div>
                                        <Button className='newButton' onClick={handleSelectRepo}>
                                            <Typography fontWeight="300" style={{zIndex: 2, fontSize:'0.9em' ,padding:'0.2em 1em'}}>New +</Typography>
                                        </Button>
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleProfileMenuOpen}
                                            sx={{ borderColor: 'white', paddingLeft:'1em' }}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                            <Box mr={1} />
                                            <Typography fontWeight="300"> { user.name } </Typography>
                                            <KeyboardArrowDownIcon  style={{fontSize:'0.65em', marginLeft:'0.8em'}}/>
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            sx={{
                                                '& .MuiMenu-paper': {
                                                  width: '200px',
                                                  maxWidth: 'none', // Esto anula el ancho máximo predeterminado
                                                },
                                              }}
                                            open={isMenuOpen}
                                            onClose={() => setAnchorEl(null)}
                                        >
                                            <MenuItem style={{fontSize: '0.8em'}} onClick={() => {handleProfile(); setAnchorEl(null)}}>Mi cuenta</MenuItem>
                                            <MenuItem style={{fontSize: '0.8em'}} onClick={() => {handleLogout(); setAnchorEl(null)}}>Cerrar sesión</MenuItem>
                                        </Menu>

                                    </div>
                                ) : (
                                    <Stack direction="row" spacing={2}>
                                        <Button 
                                            variant="outlined" 
                                            sx={{ backgroundColor: 'white !important', color: 'black !important' }}
                                            
                                            onClick={() => navigate('/login')}
                                        >
                                            Login
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            sx={{ borderColor: 'white' }}
                                            onClick={() => navigate('/register')}
                                        >
                                            Register
                                        </Button>
                                    </Stack>
                                )}
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
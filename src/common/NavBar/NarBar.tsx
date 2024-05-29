import React, { useEffect, Fragment } from 'react';
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
import MenuIcon from "@mui/icons-material/Menu";
import './new.css';

import { useWindowSize } from '../../hooks/useWindowSize';

export const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const { user, logout } = useAuthStore();
    const { width } = useWindowSize();


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
    
    const [burgerActive, setBurgerActive] = React.useState(false);

    const toggleBurger = () => {
        setBurgerActive(!burgerActive); 
    }

    useEffect(() => {
        if (width >= 768) {
          setBurgerActive(true);
        } else {
          setBurgerActive(false);
        }
    }, [width]);

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
                            className="h-16"
                        >
                            <Grid item>
                                <Typography onClick={() => navigate('/')} fontSize="1.2em" fontWeight="500" style={{cursor: 'pointer'}}> CodeIA </Typography>
                            </Grid>

                            {
                                burgerActive 
                                ? <>
                                    <Grid item className='hidden md:flex justify-center items-center'>
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
                                    <Grid item className='hidden md:flex'>
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
                                                    <Typography className='hidden lg:block' fontWeight="300"> { user.name } </Typography>
                                                    <KeyboardArrowDownIcon className='ml-0 lg:ml-3.5' style={{fontSize:'0.65em'}}/>
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

                                    <nav className='NavBar--Aux flex flex-col gap-2 py-4
                                        items-center fixed top-12 left-0 w-screen p-0 md:hidden'>
                                        <Grid item className='flex flex-col gap-2'>
                                            <Typography onClick={() => navigate('/')} textAlign="center" fontSize="1em" fontWeight="300" style={{cursor: 'pointer', padding:'0em 2em'}}> Home </Typography>
                                            { !user ?
                                                <Fragment>
                                                    <Typography onClick={() => navigate('/#feature')} textAlign="center" fontSize="1em" fontWeight="300" style={{cursor: 'pointer', padding:'0em 2em'}}> Features </Typography>
                                                    <Typography onClick={() => navigate('/pricing/#plans')} textAlign="center" fontSize="1em" fontWeight="300" style={{cursor: 'pointer', padding:'0em 2em'}}> Plans </Typography>
                                                </Fragment>
                                                : <div></div>
                                            }
                                            {user != null ? (<Typography onClick={() => navigate('/projects')} textAlign="center" fontSize="1em" fontWeight="300" style={{cursor: 'pointer', padding:'0em 2em'}}> Projects </Typography>) : (<div></div>)}
                                        </Grid>
                                        <Grid>
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
                                                        <Typography className='hidden lg:block' fontWeight="300"> { user.name } </Typography>
                                                        <KeyboardArrowDownIcon className='ml-0 lg:ml-3.5' style={{fontSize:'0.65em'}}/>
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
                                    </nav>
                                </>
                                : null
                            }

                            <MenuIcon
                                    onClick={toggleBurger}
                                    className="fixed right-8 top-4 h-auto text-white cursor-pointer md:hidden "
                            ></MenuIcon>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
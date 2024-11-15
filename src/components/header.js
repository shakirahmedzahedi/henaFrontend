import React, { useState, useEffect } from 'react';
import logo from './../assets/logo1.png';
import { AppBar, Tabs, Tab, Button, Grid, Toolbar, useTheme, useMediaQuery, Typography, Box, IconButton, Badge, TextField, InputAdornment, Avatar, Menu, MenuItem } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MiddleDrawer from './MiddleDrawer';
import NavBar from "./navBar";
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducer/services/AuthService';
import { clearError } from '../reducer/slices/AuthSlice';

export default function Header() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isScreenSmall = useMediaQuery('(max-width:1050px)');

    const [value, setValue] = React.useState('/');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleSignInClick = () => {
        console.log('Sign in clicked');
    };

    const [anchorEl, setAnchorEl] = useState(null); // Menu anchor for user avatar
    const user = useSelector((state) => state.auth.user);; // Mock user data
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(user);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMyPageClick = () => {
        navigate('/myPage', { state: { user } });
        handleMenuClose();
    };
    const handleAdminClick = () => {
        navigate('/adminPortal', { state: { user } });
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleSignOut = () => {
        console.log("Sign Out clicked.....");
        dispatch(logOut());
        handleMenuClose();
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    const bigContent = (
        <>
            <Grid container  >

                <Grid item xs={3} pt={1} style={{ textAlign: 'left' }}>

                    <img
                        src={logo}
                        alt={logo}
                        style={{ width: '190px', height: '55px' }}

                    />

                </Grid>
                <Grid item xs={7} mt={1} style={{ textAlign: 'left' }}>
                    <NavBar />

                </Grid>
                <Grid item xs={2} style={{ textAlign: 'right' }}>

                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            placeholder="Search..."
                            size="small"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="primary" />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,  // Removes the underline

                            }}
                            sx={{
                                width: '100%',
                                borderRadius: 5,
                                maxWidth: '250px',
                                borderRadius: '16px', // Increase border radius for a more rounded appearance
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                    backgroundColor: 'lightgray'
                                    // Make the outline border curvy as well
                                },

                            }}
                        />
                    </Box>

                    <Box
                        mt={1}
                        sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', maxWidth: '250px', }}
                    >


                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Badge badgeContent={4} color="primary">
                                <FavoriteBorderIcon color="primary" sx={{ fontSize: 25 }} />
                            </Badge>
                            {!isScreenSmall && <Typography variant="subtitle2" sx={{ ml: 3 }}>Favorite</Typography>}
                        </Box>
                        <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box ml={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Badge badgeContent={4} color="primary">
                                    <ShoppingBagOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                                </Badge>
                                {!isScreenSmall && <Typography variant="subtitle2" sx={{ ml: 3, textDecoration: 'none' }}>Cart</Typography>}
                            </Box>
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <IconButton onClick={handleMenuOpen}>
                                    <Avatar sx={{width: 24, height: 24,bgcolor: 'primary.main' }}>
                                        {user.email.charAt(0).toUpperCase()}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    slotProps={{
                                        paper: {
                                          elevation: 0,
                                          sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                              width: 32,
                                              height: 32,
                                              ml: -0.5,
                                              mr: 1,
                                            },
                                            '&::before': {
                                              content: '""',
                                              display: 'block',
                                              position: 'absolute',
                                              top: 0,
                                              right: 14,
                                              width: 10,
                                              height: 10,
                                              bgcolor: 'background.paper',
                                              transform: 'translateY(-50%) rotate(45deg)',
                                              zIndex: 0,
                                            },
                                          },
                                        },
                                      }}
                                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={ handleMyPageClick}>My Page</MenuItem>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                    <MenuItem onClick={handleAdminClick}>Admin Portal</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link to={'/signIn'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, cursor: 'pointer' }} >
                                    <AssignmentIndOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                                    {!isScreenSmall && <Typography variant="subtitle2" sx={{ ml: 1 }}>SignIn</Typography>}
                                </Box>
                            </Link>
                        )}


                    </Box>
                </Grid>
            </Grid>

        </>




    );

    const smallContent = (
        <Grid container  >


            <Grid item xs={8} mt={4} pr={6} style={{ textAlign: 'right' }}>
                <Link to='/'>
                    <img
                        src={logo}
                        alt={logo}
                        style={{ width: '170px', height: '35px' }}

                    />
                </Link>

            </Grid>
            <Grid item xs={4} style={{ textAlign: 'right' }}>
                <Box
                    mt={2}
                    sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                >
                    {/* <Link to={'/signIn'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, cursor: 'pointer' }} >
                            <AssignmentIndOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                        </Box>
                    </Link>
 */}
                    {isAuthenticated ? (
                        <IconButton onClick={handleMenuOpen}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                {user.firstName.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                    ) : (
                        <Link to={'/signIn'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <AssignmentIndOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                        </Link>
                    )}
                    <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingBagOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                        </Badge>
                    </Link>
                    <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Badge badgeContent={4} color="primary">
                                <ShoppingBagOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                            </Badge>
                        </Box>
                    </Link>
                </Box>
            </Grid>


        </Grid>


    )


    return (
        <AppBar position="fixed" color="inherit" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ flexDirection: 'column', width: '100%' }}>
                {smallScreen ? smallContent : bigContent}
            </Toolbar>
        </AppBar>
    );
}



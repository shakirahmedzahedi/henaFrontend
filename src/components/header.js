import React, { useState, useEffect } from 'react';
import logo from './../assets/logo1.png';
import {
    AppBar, Tabs, Tab, Button, Grid, Toolbar, useTheme, useMediaQuery, Typography, Box, IconButton,
    Badge, TextField, InputAdornment, Avatar, Menu, MenuItem,List, Paper, ListItem, ListItemButton, ListItemText
} from '@mui/material'
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
import NewNavBar from './NewNavBar';
import { setSearchQuery } from '../reducer/slices/ProductSlice';
import { feachActiveCartsByUser } from '../reducer/services/CartService';
import { clearCart } from '../reducer/slices/CartSlice';

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
   
    const user = useSelector((state) => state.auth.user);
    //const userCarts = useSelector((state) => state.auth.user?.carts);
    const activeCart = useSelector((state) => state.cart.cart);
    const articleItems = activeCart?.articles?.length || 0;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const favoriteItems = user?.favorites?.length || 0;
    

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

    const products = useSelector((state) => state.product.products);

    // Local state
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Handle input change
    const handleInputChange = (e) => {
        const input = e.target.value;
        setSearchInput(input);

        // Filter products to generate suggestions
        if (input) {
            const filtered = products
                .filter((product) =>
                    product.title.toLowerCase().includes(input.toLowerCase())
                )
                .map((product) => product.title); // Extract titles
            setSuggestions(filtered);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setSearchInput(suggestion); // Update input with suggestion
        setSuggestions([]); // Clear suggestions
    };

    // Handle search button click
    const handleSearchClick = async () => {
        await dispatch(setSearchQuery(searchInput));
        setSearchInput('');
        setSuggestions([]);
        navigate('/searchProduct'); // Navigate to search results
    };



    const handleSignOut = () => {
        console.log("Sign Out clicked.....");
        dispatch(logOut());
        handleMenuClose();
        navigate('/signIn');
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (!isAuthenticated) {
            dispatch(clearCart()); // Action to reset active cart in Redux
        }
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(clearError());
    if (user?.id) {
      dispatch(feachActiveCartsByUser(user.id));
    }
        
    }, [user, articleItems, dispatch]);

    const bigContent = (
        <>
            <Grid container  >

                <Grid item xs={2} pt={1.5}
                    alignItems="center" style={{ textAlign: 'left' }}>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                            src={logo}
                            alt={logo}
                            style={{ width: '190px', height: '55px' }}

                        />
                    </Link>

                </Grid>
                <Grid item alignItems="center" xs={8} mt={1} style={{ textAlign: 'center' }}>
                    <NewNavBar />

                </Grid>
                <Grid
                    item
                    xs={2}
                    /*  container*/
                    display={'flex'}
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ mt: 0 }}
                >

                    <Link to={'/favorite'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                            <Badge badgeContent={favoriteItems} color="primary">
                                <FavoriteBorderIcon color="primary" sx={{ fontSize: 25 }} />
                            </Badge>
                            <Typography
                                variant="subtitle2"
                                sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}
                            >
                                Favorite
                            </Typography>
                        </Box>
                    </Link>

                    <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                            <Badge badgeContent={articleItems} color="primary">
                                <ShoppingBagOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                            </Badge>
                            <Typography
                                variant="subtitle2"
                                sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}
                            >
                                Cart
                            </Typography>
                        </Box>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        bgcolor: 'primary.main',
                                    }}
                                >
                                    {user?.email.charAt(0).toUpperCase()}
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
                                transformOrigin={{
                                    horizontal: 'right',
                                    vertical: 'top',
                                }}
                                anchorOrigin={{
                                    horizontal: 'right',
                                    vertical: 'bottom',
                                }}
                            >
                                <MenuItem onClick={handleMyPageClick}>My Page</MenuItem>
                                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                {user?.roles.includes('ADMIN') && (
                                        <MenuItem onClick={handleAdminClick}>
                                            Admin Portal
                                        </MenuItem>
                                    )}
                            </Menu>
                        </>
                    ) : (
                        <Link
                            to={'/signIn'}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <AssignmentIndOutlinedIcon
                                    color="primary"
                                    sx={{ fontSize: 25 }}
                                />
                                <Typography
                                    variant="subtitle2"
                                    sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}
                                >
                                    SignIn
                                </Typography>
                            </Box>
                        </Link>
                    )}
                </Grid>
            </Grid>

        </>




    );

    const smallContent = (
        <>
            <Grid container sx={{ margin: 0, padding: 0 }}>
                {/* Logo Section */}
                <Grid item mt={1} xs={8} sx={{ textAlign: 'left', paddingLeft:3  }}>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            style={{ width: '170px', height: '35px' }}
                        />
                    </Link>
                </Grid>
    
                {/* Icons Section */}
                <Grid item  mt={1.5} xs={4} sx={{ textAlign: 'right', padding: 0 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            margin: 0,
                        }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Badge badgeContent={favoriteItems} color="primary">
                                <FavoriteBorderIcon color="primary" sx={{ fontSize: 25 }} />
                            </Badge>
                        </Link>
                        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box ml={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Badge badgeContent={articleItems} color="primary">
                                    <ShoppingBagOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                                </Badge>
                            </Box>
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <IconButton onClick={handleMenuOpen}>
                                    <Avatar
                                        sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}
                                    >
                                        {user?.firstName.charAt(0).toUpperCase()}
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
                                    transformOrigin={{
                                        horizontal: 'right',
                                        vertical: 'top',
                                    }}
                                    anchorOrigin={{
                                        horizontal: 'right',
                                        vertical: 'bottom',
                                    }}
                                >
                                    <MenuItem onClick={handleMyPageClick}>My Page</MenuItem>
                                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                    {user?.roles.includes('ADMIN') && (
                                        <MenuItem onClick={handleAdminClick}>
                                            Admin Portal
                                        </MenuItem>
                                    )}
                                </Menu>
                            </>
                        ) : (
                            <Link
                                to="/signIn"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <Box
                                    ml={2}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mr: 1,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <AssignmentIndOutlinedIcon
                                        color="primary"
                                        sx={{ fontSize: 25 }}
                                    />
                                </Box>
                            </Link>
                        )}
                    </Box>
                </Grid>
            </Grid>
    
            {/* Search Bar Section */}
            <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
                <TextField
                    placeholder="Search..."
                    fullWidth
                    value={searchInput}
                    onChange={handleInputChange}
                    size="small"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleSearchClick} // Trigger search
                                    color="primary"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        height: '30px', // Set the height of the search bar
                        margin: 0,
                        padding:0, // Remove extra margins
                        '& .MuiOutlinedInput-root': {
                            height: '30px',
                            fontSize: '.7rem', // Adjust font size
                            padding: '0 0px',
                            borderRadius: '16px',
                            backgroundColor: 'lightgray',
                            '& .MuiInputAdornment-root svg': {
                                fontSize: '16px', // Smaller icon
                            },
                        },
                    }}
                />
            </Box>
            {suggestions.length > 0 && (
                        <Paper
                            sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '100%',
                                maxWidth: '600px',
                                zIndex: 10,
                                maxHeight: '200px',
                                overflowY: 'auto',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <List>
                                {suggestions.map((suggestion, index) => (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        onClick={() => handleSuggestionClick(suggestion)} // Select suggestion
                                    >
                                        <ListItemButton>
                                            <ListItemText primary={suggestion} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    )}
        </>
    );
    

    //smallScreen ? smallContent :
    return (
        <AppBar position="fixed" color="inherit" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{ flexDirection: 'column', width: '100%' }}>
                {smallScreen ? smallContent : bigContent}
            </Toolbar>
        </AppBar>
    );
}



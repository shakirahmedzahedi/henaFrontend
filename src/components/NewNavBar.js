import React, { useState, useEffect } from 'react';
import {
    Tabs,
    Tab,
    Grid,
    Box,
    TextField,
    Badge,
    IconButton,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    useTheme,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducer/services/AuthService';

export default function NewNavBar() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Get current route
    const [searchActive, setSearchActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // Menu anchor for user avatar
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
        dispatch(logOut());
        handleMenuClose();
        navigate('/signIn');
    };

    const toggleSearch = () => {
        setSearchActive(!searchActive);
    };

    return (
        <div>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2 }} // Padding for the container
            >
                {/* Tabs Section (Centered) */}
                <Grid item xs={8} container justifyContent="center" pl={3}>
                    <Tabs
                        value={location.pathname} // Bind value to current route
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="navigation tabs"
                        sx={{
                            fontWeight: theme.typography.fontWeightMedium,
                            '& .MuiTab-root': {
                                fontWeight: 'bold',
                                fontSize: '.8rem',
                            },
                        }}
                    >
                        <Tab
                            sx={{ mt: 1, display: { xs: 'none', md: 'block' } }}
                            value="/allproduct"
                            label="Products"
                            component={Link}
                            to="/allproduct"
                        />
                        <Tab
                            sx={{ mt: 1, display: { xs: 'none', md: 'block' } }}
                            value="/newArrival"
                            label="New Arrival"
                            component={Link}
                            to="/newArrival"
                        />
                        <Tab
                            sx={{ mt: 1, display: { xs: 'none', md: 'block' } }}
                            value="/babyAndKids"
                            label="Baby & Kids"
                            component={Link}
                            to="/babyAndKids"
                        />
                        <Tab
                            sx={{ mt: 1, display: { xs: 'none', md: 'block' } }}
                            value="/familyAndMom"
                            label="Family & Mom"
                            component={Link}
                            to="/familyAndMom"
                        />
                    </Tabs>
                </Grid>

                {/* Search and Buttons Section (Right-Aligned) */}
                <Grid item xs={4} container justifyContent="flex-end">
                    {searchActive ? (
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <TextField
                                placeholder="Search..."
                                size="small"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon onClick={toggleSearch} color="primary" />
                                        </InputAdornment>
                                    ),
                                    disableUnderline: true, // Removes the underline
                                }}
                                sx={{
                                    width: '100%',
                                    maxWidth: '250px',
                                    borderRadius: '16px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',
                                        backgroundColor: 'lightgray',
                                    },
                                }}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                maxWidth: '250px',
                            }}
                        >
                            {/* Search Icon */}
                            <IconButton onClick={toggleSearch}>
                                <SearchIcon color="primary" sx={{ fontSize: 25 }} />
                            </IconButton>

                            {/* Favorite */}
                            <Link to={'/favorite'} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                                <Badge badgeContent={4} color="primary">
                                    <FavoriteBorderIcon color="primary" sx={{ fontSize: 25 }} />
                                </Badge>
                                <Typography variant="subtitle2" sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}>
                                    Favorite
                                </Typography>
                            </Box>
                        </Link>

                            {/* Cart */}
                            <Link to={'/cart'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mx: 1 }}>
                                    <Badge badgeContent={4} color="primary">
                                        <ShoppingBagOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                                    </Badge>
                                    <Typography variant="subtitle2" sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}>
                                        Cart
                                    </Typography>
                                </Box>
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <IconButton ml={1} onClick={handleMenuOpen}>
                                        <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
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
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={handleMyPageClick}>My Page</MenuItem>
                                        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                                        {user?.roles.includes('ADMIN') && (
                                            <MenuItem onClick={handleAdminClick}>Admin Portal</MenuItem>
                                        )}
                                    </Menu>
                                </>
                            ) : (
                                <Link to={'/signIn'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <AssignmentIndOutlinedIcon color="primary" sx={{ fontSize: 25 }} />
                                        <Typography variant="subtitle2" sx={{ ml: 1, display: { xs: 'none', lg: 'block' } }}>
                                            SignIn
                                        </Typography>
                                    </Box>
                                </Link>
                            )}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

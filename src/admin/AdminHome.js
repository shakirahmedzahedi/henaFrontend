import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SideNav from './SideNav'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import CouponsSection from './coupons/CouponsSection';
import UsersSection from './users/UsersSection';
import ProductsSection from './products.js/ProductsSection';
import Dashboard from './dashboard/Dashboard';


const AdminHome = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setCollapsed(isSmallScreen);
    }, [isSmallScreen]);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div>

            <Box bgcolor={theme.palette.primary.main} sx={{ display: 'flex' }}>

                <IconButton

                    onClick={handleToggleSidebar}
                >
                    {collapsed ? <MenuIcon fontSize='large' /> : <MenuOpenIcon fontSize='large' />}
                </IconButton>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    <Typography variant='h4' sx={{ color: 'white' }}>
                        Admin Portal
                    </Typography>
                </Box>
                

            </Box>
            <Box sx={{ display: 'flex' }}>
                <SideNav collapsed={collapsed} />
                <Box sx={{ flexGrow: 1, padding: '20px', marginLeft: collapsed ? '60px' : '60px' }}>
                    <Outlet />
                </Box>
            </Box>
        </div>
    )
}

export default AdminHome

import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Link } from 'react-router-dom';

const MiddleDrawer = () => {
    const [open, setOpen] = useState(false);
    const manuList = [
        { key: '/', value: 'Home' },
        { key: '/signIn', value: 'SignIn' },
        { key: '/SignUp', value: 'SignUp' },
        { key: '/contact', value: 'contact' },
        { key: '/about', value: 'about' },
       
        
    ];

    const contant = manuList.map((index) => (
        <>
             <Link style={{textDecoration: 'none', '&:hover': { color: '#fccc04' } }} to={index.key}> 
                <ListItemButton style={{ display: 'flex', justifyContent: 'center' }}>
                    <ListItemIcon>
                        <ListItemText style={{ color: "#FFFFFF", '&:hover': { color: "#fccc04" }}}>
                            {index.value}
                        </ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </Link> 
            <Divider></Divider>
        </>

    ));
    return (
        <>
            <Drawer sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: 'primary.main',
                    opacity: '.9'
                },
            }}

                anchor='top'
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box style={{ overflow: 'hidden' }}>
                    <List onClick={() => setOpen(false)}>
                        {contant}
                    </List>
                </Box>


            </Drawer >
            <IconButton onClick={() => setOpen(true)}>
                <MenuOutlinedIcon color='primary' sx={{ fontSize: 35 }}  />
            </IconButton>

        </>
    )
}

export default MiddleDrawer

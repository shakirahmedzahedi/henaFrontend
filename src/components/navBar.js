import { AppBar, Tabs, Tab, Button, Grid, Toolbar, useTheme, useMediaQuery, Typography, Box,TextField, InputAdornment } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';


export default function NavBar() {
    const theme = useTheme();
    const [value, setValue] = React.useState('/');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Grid  container  pl={2} alignItems="center" justifyContent="left">
                <Grid item  justifyContent="right" >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        sx={{
                            
                            fontWeight: theme.typography.fontWeightMedium,
                            '& .MuiTab-root': {
                                fontWeight: 'bold',
                                fontSize: '.8rem', // Adjusted size
                            },
                        }}
                    >
                        <Tab value="/allproduct" label="Products" component={Link} to="/allproduct"/>
                        <Tab value="/newArrival" label="New Arrival" component={Link} to="/newArrival"/>
                        <Tab value="/babyAndKids" label="Baby&Kids" component={Link} to="/babyAndKids"/>
                        <Tab value="/familyAndMom" label="Family&Mom" component={Link} to="/familyAndMom"/>
                    </Tabs>
                
                </Grid>
               
            </Grid>

        </div>
    )
}



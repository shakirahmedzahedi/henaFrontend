import React from 'react';
import {
    Tabs,
    Tab,
    Grid,
    TextField,
    InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';

export default function NewNavBar() {
    const location = useLocation();

    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: '65px', // Total height for Tabs + Search bar
                }}
            >
                {/* Tabs Section */}
                <Grid
                    item
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Tabs
                        value={location.pathname}
                        textColor="secondary"
                        indicatorColor="none"
                        aria-label="navigation tabs"
                        disableRipple
                        sx={{
                            height: '30px', // Set height of Tabs
                            minHeight: '30px', // Override default min-height
                            '& .MuiTab-root': {
                                fontWeight: 'bold',
                                fontSize: '.8rem',
                                minHeight: '30px',
                                height: '30px',
                                paddingLeft: 6,
                                margin: 0,
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none', // Remove underline
                            },
                        }}
                    >
                        <Tab
                            value="/allproduct"
                            label="Products"
                            component={Link}
                            to="/allproduct"
                        />
                        <Tab
                            value="/newArrival"
                            label="New Arrival"
                            component={Link}
                            to="/newArrival"
                        />
                        <Tab
                            value="/babyAndKids"
                            label="Baby & Kids"
                            component={Link}
                            to="/babyAndKids"
                        />
                        <Tab
                            value="/familyAndMom"
                            label="Family & Mom"
                            component={Link}
                            to="/familyAndMom"
                        />
                    </Tabs>
                </Grid>

                {/* Search Bar Section */}
                <Grid
                    item
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 0.5, 
                        pl:3// Minimal spacing between Tabs and Search Bar
                    }}
                >
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
                        }}
                        sx={{
                            width: '100%',
                            maxWidth: '600px',
                            height: '30px', // Set the height of the search bar
                            '& .MuiOutlinedInput-root': {
                                height: '30px',
                                fontSize: '.7rem', // Adjust font size
                                padding: '0 8px',
                                borderRadius: '16px',
                                backgroundColor: 'lightgray',
                                '& .MuiInputAdornment-root svg': {
                                    fontSize: '16px', // Smaller icon
                                },
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

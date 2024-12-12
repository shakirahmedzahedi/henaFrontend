import React, { useState } from 'react';
import {
    Grid,
    TextField,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../reducer/slices/ProductSlice';
import { useNavigate } from 'react-router-dom';

export default function NewNavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: '65px',
                }}
            >
                {/* Search Bar Section */}
                <Grid
                    item
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 0.5,
                        pl: 3,
                        position: 'relative', // Required for suggestion dropdown
                    }}
                >
                    <TextField
                        placeholder="Search..."
                        size="small"
                        variant="outlined"
                        value={searchInput}
                        onChange={handleInputChange} // Update input and suggestions
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
                            width: '100%',
                            maxWidth: '600px',
                            height: '30px',
                            '& .MuiOutlinedInput-root': {
                                height: '30px',
                                fontSize: '.7rem',
                                padding: '0 8px',
                                borderRadius: '16px',
                                backgroundColor: 'lightgray',
                                '& .MuiInputAdornment-root svg': {
                                    fontSize: '16px',
                                },
                            },
                        }}
                    />

                    {/* Suggestions Dropdown */}
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
                </Grid>
            </Grid>
        </div>
    );
}

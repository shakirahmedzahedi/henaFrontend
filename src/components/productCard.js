import React from 'react'
import one from '../assets/one.jpg'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography, Button, CardActionArea, CardActions, Card, Box, useTheme, useMediaQuery } from '@mui/material';

const ProductCard = (props) => {
    return (
        <Box >
            <Card  sx={{ maxWidth:500 }}>
                <CardActionArea >
                    <CardMedia
                        component="img"
                        height="240"
                        maxWidth="400"
                        image={one}
                        alt="green iguana"
                    />
                    <CardContent sx={{ bgcolor: 'info.main' }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Squada One'}}>
                            product one
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Squada One'}}>
                            4.5
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Squada One'}}>
                            100SEK
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Squada One'}}>
                            80SEK
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained">Add TO Cart</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default ProductCard

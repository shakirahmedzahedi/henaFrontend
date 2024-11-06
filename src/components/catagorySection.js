import React from 'react'
import { Box, Grid, Typography, Divider, CardActionArea, CardActions, Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import children from './../assets/children.jpg'
import mom from './../assets/family.jpg'
import family from './../assets/family.jpeg'

export default function CatagorySection() {
    return (
        <div>
            <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h1' align='left' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '20px', md: '24px', lg: '36px' } }}>
                    Hena Catagories
                </Typography>
            </Box>
            {/* <Box >
                <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.2vh' }} />
            </Box > */}

            <Grid container alignItems={'center'} spacing={1} mt={2}>

                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ mt: 2 }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={children}
                                alt="baby"
                            />
                            <CardContent sx={{ bgcolor: 'info.main' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Baby&Kids
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ mt: 2 }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={mom}
                                alt="mom"
                            />
                            <CardContent sx={{ bgcolor: 'info.main' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Family&Mom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ mt: 2 }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={family}
                                alt="new arrival"
                            />
                            <CardContent sx={{ bgcolor: 'info.main' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    New Arrival
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

            </Grid>

        </div>
    )
}

import React from 'react'
import { Box, Grid, Typography, Divider, CardActionArea, CardActions, Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import children from './../assets/children.jpg'
import mom from './../assets/family.jpg'
import family from './../assets/family.jpeg'
import { useNavigate } from 'react-router';

export default function CatagorySection() {

    const navigate = useNavigate();

    return (
        <div>
            <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h1' align='left' color={'primary'}sx={{ /* fontFamily: 'Squada One', */ fontSize: { xs: '16px', md: '20px', lg: '24px' } }}>
                    Hena Catagories
                </Typography>
            </Box>
            <Box >
                <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
            </Box >

            <Grid container alignItems={'center'} spacing={1} mt={2}>

                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ mt: 2 }} onClick={()=> navigate('/babyAndKids')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={children}
                                alt="baby"
                            />
                            <CardContent sx={{ bgcolor: 'info.dark' }}>
                                <Typography gutterBottom variant="body1" component="div">
                                    Baby&Kids
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ mt: 2 }} onClick={()=> navigate('/familyAndMom')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={mom}
                                alt="mom"
                            />
                            <CardContent sx={{ bgcolor: 'info.dark' }}>
                                <Typography gutterBottom variant="body1" component="div">
                                    Family&Mom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ mt: 2 }} onClick={()=> navigate('/newArrival')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={family}
                                alt="new arrival"
                            />
                            <CardContent sx={{ bgcolor: 'info.dark' }}>
                                <Typography gutterBottom variant="body1" component="div">
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

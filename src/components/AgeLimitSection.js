import React from 'react'
import { Box, Grid, Typography, Divider, CardActionArea, CardActions, Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import baby from './../assets/baby (1).jpeg'
import mom from './../assets/mom.jpg'
import family from './../assets/family.jpeg'
import newborn from './../assets/newborn.jpg'
import todler from './../assets/toddler.jpg'
import kids from './../assets/kids.jpg'
import { useNavigate } from 'react-router';


export default function AgeLimitSection() {

    const navigate = useNavigate();

    return (
        <div>
            <Box sx={{ textAlign: 'left' }}>
                <Typography variant='h1' align='left' color={'primary'} sx={{ /* fontFamily: 'Squada One', */ fontSize: { xs: '16px', md: '20px', lg: '24px' } }}>
                Shop by Life’s Chapters
                </Typography>
            </Box>
             <Box >
                <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
            </Box >
 
            <Grid container alignItems={'center'} spacing={1} mt={2}>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }} onClick={()=> navigate('/newBorn')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={newborn}
                                alt="baby"
                            />
                            <CardContent sx={{ bgcolor: 'info.dark' }}>
                                <Typography gutterBottom variant="body1" component="div">
                                Newborns (0-1 year)
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }} onClick={()=> navigate('/toddler')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={todler}
                                alt="mom"
                            />
                            <CardContent sx={{ bgcolor: 'info.dark' }}>
                                <Typography gutterBottom variant="body1" component="div">
                                Toddlers (1-2 years)
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }} onClick={()=> navigate('/children')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={kids}
                                alt="new arrival"
                            />
                            <CardContent sx={{ bgcolor: 'info.dark' }}>
                                <Typography gutterBottom variant="body1" component="div">
                                Children
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }} onClick={()=> navigate('/mon')}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={mom}
                                alt="new arrival"
                            />
                            <CardContent sx={{ bgcolor: 'info.dark' }}>
                                <Typography gutterBottom variant="body1" component="div">
                                Mom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

            </Grid>

        </div>
    )
}

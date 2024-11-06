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


export default function AgeLimitSection() {
    return (
        <div>
            <Box sx={{ textAlign: 'left' }}>
                <Typography variant='h1' align='left' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '20px', md: '24px', lg: '36px' } }}>
                Shop by Life’s Chapters
                </Typography>
            </Box>
           {/*  <Box >
                <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.2vh' }} />
            </Box > */}

            <Grid container alignItems={'center'} spacing={1} mt={2}>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={newborn}
                                alt="baby"
                            />
                            <CardContent sx={{ bgcolor: 'info.main' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                Newborns (0-1 year)
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={todler}
                                alt="mom"
                            />
                            <CardContent sx={{ bgcolor: 'info.main' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                Toddlers (1-2 years)
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={kids}
                                alt="new arrival"
                            />
                            <CardContent sx={{ bgcolor: 'info.main' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                Children
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="240"
                                maxWidth="350"
                                image={mom}
                                alt="new arrival"
                            />
                            <CardContent sx={{ bgcolor: 'info.main' }}>
                                <Typography gutterBottom variant="h6" component="div">
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

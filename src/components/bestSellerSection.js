import React from 'react'
import { Box, Grid, Typography, Divider, CardActionArea, CardActions, Card } from '@mui/material'
import ProductCard from './productCard'
import { Link } from 'react-router-dom'

export default function BestSellerSection() {
    return (
        <div>
            <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h1' align='left' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '20px', md: '24px', lg: '36px' } }}>
                    Hena Best Seller
                </Typography>
            </Box>
            {/* <Box >
                <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.2vh' }} />
            </Box > */}

            <Grid container alignItems="center" justifyContent="center" spacing={1} mt={2}>
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Link to={'/productDetails'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ProductCard />
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Link to={'/productDetails'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ProductCard />
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Link to={'/productDetails'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ProductCard />
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Link to={'/productDetails'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ProductCard />
                    </Link>
                </Grid>
            </Grid>


        </div>
    )
}

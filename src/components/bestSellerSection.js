import React, { useEffect } from 'react'
import { Box, Grid, Typography, Divider, CardActionArea, CardActions, Card } from '@mui/material'
import ProductCard from './productCard'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../reducer/services/ProductService'

export default function BestSellerSection() {
    const dispatch = useDispatch();
    const products = useSelector((state)=> state.product.products);
    const bestSellerList = products?.filter(p=>p.bestSeller === true);

    useEffect(()=>{
        dispatch(fetchAllProducts());
        console.log(bestSellerList);
    },[dispatch])
    return (
        <div>
            <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h1' align='left' color={'primary'} sx={{ fontSize: { xs: '16px', md: '20px', lg: '24px' } }}>
                    Hena Best Seller
                </Typography>
            </Box>
            <Box >
                <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
            </Box >

            {bestSellerList?.length > 0 ? (
            <Grid container alignItems="center" justifyContent="space-between" spacing={1} mt={2}>
            {bestSellerList.map((item, index) => (
                <Grid item key={item.id} xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2/* , display: 'flex', justifyContent: 'left' */ }}>
                    
                    <ProductCard product={item} />
                    
                </Grid>
            ))}

                {/* <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
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
                </Grid> */}
            </Grid>): null}


        </div>
    )
}

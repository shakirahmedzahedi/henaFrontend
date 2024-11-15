import React, { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../reducer/services/ProductService';
import { Link } from 'react-router-dom';
import ProductCard from '../components/productCard';

const ProductPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    console.log(products);

    useEffect(()=> {
        console.log("hello2");
        dispatch(fetchAllProducts());
    },[]);


  return (
    <div>
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h1' align='left' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '20px', md: '24px', lg: '36px' } }}>
                    Our Products
                </Typography>
            </Box>
            <Grid container alignItems="center" justifyContent="center" spacing={1} mt={2}>
                {products?.map((product,index) =>(
                <Grid key={product.id} item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    
                    <ProductCard product={product}/>
                    
                </Grid>
))}
                </Grid>
      
    </div>
  )
}

export default ProductPage

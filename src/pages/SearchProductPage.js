import React from 'react'
import { Box, Typography, Grid, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/productCard';

const SearchProductPage = () => {
    const products = useSelector((state) => state.product.products);
    const searchQuery = useSelector((state)=> state.product.searchQuery);
    console.log(products);
    console.log(searchQuery);
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log(filteredProducts);

  return (
    <Box sx={{ padding: .5, minHeight: '78vh', ml: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, mr: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, pb:9 }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h1' align='left' color={'primary'} sx={{  fontSize: { xs: '20px', md: '24px', lg: '36px' } }}>
                  Search Result
                </Typography>
            </Box>
            <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
            <Grid container alignItems="center" justifyContent="left" spacing={1} mt={2}>
                {filteredProducts?.map((product, index) => (
                    <Grid key={product.id} item xs={6} sm={3} md={3} lg={2.4} xl={2.4} sx={{ mt: 2/* , display: 'flex', justifyContent: 'center'  */}}>

                        <ProductCard product={product} />

                    </Grid>
                ))}
            </Grid>

        </Box>
  )
}

export default SearchProductPage

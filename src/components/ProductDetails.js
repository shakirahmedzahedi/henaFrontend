import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, CardMedia, TextField, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import image from './../assets/one.jpg'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../reducer/services/ProductService';

const ProductDetails = (props) => {
  const { productId } = useParams(); // Get productId from the URL
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product); // Assume you have selectedProduct in your state
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    if (type === 'increment') setQuantity(quantity + 1);
    else if (type === 'decrement' && quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
         <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h1' align='left' color={'primary'} sx={{ fontFamily: 'Poppins', fontSize: { xs: '24px', md: '36px', lg: '36px' } }}>
           {product?.title}
          </Typography>
        </Box>
        <Box >
          <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.1vh' }} />
        </Box >
      <Grid container spacing={4} sx={{ fontFamily: 'Poppins' }}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product?.thumbnail}
            alt=""
            sx={{ borderRadius: 2, width: '100%', objectFit: 'cover' }}
          />
        </Grid>

        {/* Product Information */}
        <Grid item xs={12} md={6} textAlign={'right'}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            {product?.title}
          </Typography>

          <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
          ৳ {product?.price}
          </Typography>
          <Typography variant="h6" color="secondary" sx={{ mb: 1 }}>
            {product?.discountPercentage}%
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
           { product?.brand}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
           { product?.stock > 0 ?"In Stock":"Out of Stock"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Size Options */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Size</Typography>
          <Button variant="outlined" size="small" sx={{ mr: 1 }}>{product?.size}</Button>

          <Divider sx={{ my: 2 }} />
 
          {/* Add to Cart Button */}
          <Button  variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
            ADD TO CART
          </Button>
        </Grid>
      </Grid>

      {/* Additional Information */}
      <Box sx={{ mt: 4 }}>
      <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Description</Typography>
        
        <p>
       {product?.description}
        </p>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" >
          AdditionalInfo
        </Typography>
        
        <p>
        {product?.additionalInfo}
        </p>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" >
          Extras
        </Typography>

      </Box>
    </Box>
  );
};

export default ProductDetails;
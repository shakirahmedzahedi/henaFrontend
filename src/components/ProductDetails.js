import React, { useState } from 'react';
import { Box, Button, Typography, Grid, CardMedia, TextField, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import image from './../assets/one.jpg'

const ProductDetails = (props) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    if (type === 'increment') setQuantity(quantity + 1);
    else if (type === 'decrement' && quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
         <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h1' align='left' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '40px', md: '50px', lg: '60px' } }}>
           Product Name and Details
          </Typography>
        </Box>
        <Box >
          <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.1vh' }} />
        </Box >
      <Grid container spacing={4} sx={{ fontFamily: 'Poppins' }}>
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <CardMedia
            component="img"
            image={image}
            alt=""
            sx={{ borderRadius: 2, width: '100%', objectFit: 'cover' }}
          />
        </Grid>

        {/* Product Information */}
        <Grid item xs={12} md={5} textAlign={'right'}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            product.name
          </Typography>

          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            100BDT
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            product.description
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Size Options */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Size</Typography>
          <Button variant="outlined" sx={{ mr: 1 }}>100 ml</Button>
          <Button variant="outlined">60 ml</Button>

          {/* Quantity Selector */}
          <Box  sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>Quantity</Typography>
            <IconButton onClick={() => handleQuantityChange('decrement')}>
              <RemoveIcon />
            </IconButton>
            <TextField
              value={quantity}
              sx={{ width: 50, textAlign: 'center' }}
              inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
            />
            <IconButton onClick={() => handleQuantityChange('increment')}>
              <AddIcon />
            </IconButton>
          </Box>

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
        No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him. No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.
        </p>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" >
          Product.additionalInfo
        </Typography>
        
        <p>
        No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him. No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.
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
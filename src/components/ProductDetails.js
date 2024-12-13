import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, CardMedia, IconButton, Divider, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../reducer/services/ProductService';
import { addToCart } from '../reducer/services/CartService';

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false); // For blurring effect and loader

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') setQuantity(quantity + 1);
    else if (type === 'decrement' && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticate) {
      navigate('/signin'); // Redirect to sign-in page if not logged in
      return;
    }
    setIsProcessing(true); // Start processing (blur and loader)
    try {
      await dispatch(addToCart({ userId, productId: product?.id, unit: quantity }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  const oldPrice = product?.price || 0;
  const newPrice = oldPrice - (oldPrice * (product?.discountPercentage || 0) / 100);

  return (
    <Box>
      {(isProcessing) && (
        // Fullscreen Loader
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <CircularProgress size={96} />
        </Box>
      )}
      <Box sx={{ filter: isProcessing ? 'blur(5px)' : 'none', pointerEvents: isProcessing ? 'none' : 'auto' }}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress size={96} />
          </Box>
        ) : (
          <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h1" align="left" color="primary" sx={{ fontFamily: 'Poppins', fontSize: { xs: '12px', md: '24px', lg: '24px' } }}>
                {product?.title}
              </Typography>
            </Box>
            <Box>
              <Divider sx={{ bgcolor: 'info.dark', minHeight: '.1vh' }} />
            </Box>
            <Grid container mt={0.5} spacing={4} sx={{ fontFamily: 'Poppins' }}>
              {/* Product Image */}
              <Grid item xs={12} md={6} textAlign={'right'}>
                <CardMedia
                  component="img"
                  image={product?.thumbnail}
                  alt=""
                  sx={{ borderRadius: 2, width: '80%', objectFit: 'cover' }}
                />
              </Grid>

              {/* Product Information */}
              <Grid item xs={12} md={6} textAlign={'right'}>
                <Typography variant="body2" fontWeight="bold" gutterBottom>
                  {product?.title}
                </Typography>

                {/* Price Section */}
                {product?.discountPercentage ? (
                  <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                    ৳ {newPrice.toFixed(2)}{' '}
                    <Box component="span" sx={{ textDecoration: 'line-through', ml: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
                      ৳ {oldPrice.toFixed(2)}
                    </Box>
                  </Typography>
                ) : (
                  <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                    ৳ {newPrice.toFixed(2)}
                  </Typography>
                )}

                {product?.discountPercentage ? (
                  <Typography variant="h6" color="secondary" sx={{ mb: 1 }}>
                    {product?.discountPercentage}%
                  </Typography>) : null}
                <Typography variant="body1" color="text.secondary" sx={{ mb: .5 }}>
                  {product?.brand}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: .5 }}>
                  {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: .5 }}>
                  {product?.size}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Quantity Control */}
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Quantity</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 1 }}>
                  <IconButton onClick={() => handleQuantityChange('decrement')}><RemoveIcon /></IconButton>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <IconButton onClick={() => handleQuantityChange('increment')}><AddIcon /></IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  size="large"
                  sx={{ mt: 3 }}
                  disabled={ product?.stock < 1}
                >
                  ADD TO CART
                </Button>
              </Grid>
            </Grid>

            {/* Additional Information */}
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Description</Typography>
              <p>{product?.description}</p>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Additional Info</Typography>
              <p>{product?.additionalInfo}</p>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Extras</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;

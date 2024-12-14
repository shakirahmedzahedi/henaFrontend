import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton,
  TextField,
  Paper,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, deleteCart, feachActiveCartsByUser } from '../reducer/services/CartService';
import { fetchCouponByNumber, clearError } from '../reducer/services/DiscountCouponService';
const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const activeCart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);
  const [loadingItems, setLoadingItems] = useState({});
  const discountedcoupon = useSelector((state) => state.coupon.discountedCoupon); // Coupon state
  const articles = activeCart?.articles;
  const userId = user.id;
  const error = useSelector((state) => state.coupon.error);
  const [discountCodeValue, setDiscountCodeValue] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const initialDiscount = user?.initialDiscount;
  const discount = discountCodeValue?.discountAmount;

  useEffect(() => {
    dispatch(clearError());
    if (user?.id) {
      dispatch(feachActiveCartsByUser(user.id));
    }
  }, [user, dispatch]);

  // Update subtotal and tax whenever the cart or coupon changes
  useEffect(() => {
    if (articles?.length > 0) {
      const calculatedSubtotal = calculateSubtotal();
      const calculatedTax = calculateTax(calculatedSubtotal);
      setSubtotal(calculatedSubtotal);
      setTax(calculatedTax);
    }
  }, [articles]);

  // Recalculate the total whenever the coupon or subtotal changes
  useEffect(() => {
    let calculatedTotal = subtotal;
    if (user?.initialDiscount) {
      calculatedTotal -= 200.00;
    }
    if (discountedcoupon) {

      calculatedTotal -= discountedcoupon?.discountAmount; // Apply discount
    }
    setTotal(calculatedTotal);
  }, [discountedcoupon, subtotal, tax]); // Trigger when discount, subtotal, or tax changes

  const handleRemoveItem = async (productId, unit) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    await dispatch(deleteCart({ userId, productId, unit }));
    setLoadingItems((prev) => ({ ...prev, [productId]: false }));
  };

  const handleIncreaseQuantity = async (productId) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    await dispatch(addToCart({ userId, productId, unit: 1 }));
    setLoadingItems((prev) => ({ ...prev, [productId]: false }));
  };

  const handleDecreaseQuantity = async (productId) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    await dispatch(removeFromCart({ userId, productId, unit: 1 }));
    setLoadingItems((prev) => ({ ...prev, [productId]: false }));
  };

  const calculateSubtotal = () => {
    return articles?.reduce((acc, item) => {
      const price = item.product.discountPercentage
        ? item.product.price - (item.product.price * item.product.discountPercentage) / 100
        : item.product.price;
      return acc + price * item.unit;
    }, 0);
  };

  const calculateItemTotal = (item) => {


    const price = item.product.discountPercentage
      ? item.product.price - (item.product.price * item.product.discountPercentage) / 100
      : item.product.price;

    return price * item.unit;
  };

  const calculateTax = (subtotal) => {
    return (subtotal * 0.1).toFixed(2); // Assume 10% tax rate
  };

  const calculateDiscountedPrice = (price, discount) => {
    return discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscountCodeValue(value);
  };

  const handleClickUseCoupon = async () => {
    try {
      await dispatch(fetchCouponByNumber(discountCodeValue)).unwrap(); // Resolves or throws

      console.log('Coupon applied successfully!');
    } catch (error) {
      console.error('Error applying coupon:', error); // Logs the rejection reason (e.g., 'Invalid Coupon')
    } finally {
      setDiscountCodeValue('');
    }
  };

  return (
    <Box >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" align="center" color="primary" sx={{ fontSize: { xs: '24px', md: '36px', lg: '36px' } }}>
          Checkout
        </Typography>
      </Box>
      <Box>
        <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
      </Box>
      <Grid container spacing={4} mt={3} sx={{ fontFamily: 'Poppins' }}>
        {/* Left Side: List of Items */}
        <Grid item xs={12} md={8} pr={3}>
          <Typography variant="h6" gutterBottom>
            Items in Your Cart
          </Typography>
          {articles?.length > 0 ? (
            <Box>
              {articles?.map((item, index) => (
                <>
                  <Grid container mt={2}>
                    <Grid item xs={2}>
                      <Box sx={{ width: 50, height: 50, overflow: 'hidden', mr: 3 }}>
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={7}>
                      <Box /* sx={{ width: 60, height: 60, overflow: 'hidden', mr: 2 }} */>
                        <Typography variant="body2" >
                          {item.product.title}
                        </Typography>
                        {loadingItems[item.product.id] ? <CircularProgress size={24} /> :
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => handleDecreaseQuantity(item.product.id)} aria-label="decrease quantity">
                              <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1" color="text.primary" sx={{ mx: 1 }}>
                              {item.unit}
                            </Typography>
                            <IconButton onClick={() => handleIncreaseQuantity(item.product.id)} aria-label="increase quantity">
                              <AddIcon />
                            </IconButton>
                            <IconButton onClick={() => handleRemoveItem(item.product.id, item.unit)} edge="end" aria-label="delete">
                              <DeleteIcon  color='secondary'/>
                            </IconButton>
                          </Box>
                        }
                        {item.product.discountPercentage ? (
                          <>
                            <Typography
                              variant="body2"
                              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                            >
                              ৳ {item.product.price}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="primary">
                              ৳ {calculateDiscountedPrice(item.product.price, item.product.discountPercentage)}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="body2" fontWeight="bold" color="primary">
                            ৳ {item.product.price}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={3}>
                      <Box >
                        <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ ml: 2 }}>
                          ৳ {calculateItemTotal(item)}
                        </Typography>

                      </Box>
                    </Grid>


                  </Grid >
                  <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
                </>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              No items in your cart.
            </Typography>
          )}
        </Grid>

        {/* Right Side: Order Summary */}
        <Grid item textAlign={'right'} xs={12} md={4} pl={3}>
          {articles?.length > 0 ? (
            <Paper elevation={3}>
              <Typography variant="h5" textAlign={'center'} gutterBottom>
                Order Summary
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1" color="text.secondary">
                  ৳ {subtotal}
                </Typography>
              </Box>

              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Tax <span>included</span> (10%):</Typography>
                <Typography variant="body1" color="text.secondary">
                  ৳ {tax}
                </Typography>
              </Box>
              {user?.initialDiscount && (
                <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Welcome Discount:</Typography>
                  <Typography variant="body1" color="text.secondary">
                    ৳ 200.00
                  </Typography>
                </Box>
              )}


              <Box sx={{ mb: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <TextField
                  size="small"
                  label="Discount Code"
                  name="discountCode"
                  value={discountCodeValue}
                  onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  sx={{ width: '200px' }}
                />
                <Button ml={2} color="error" size="small" disabled={discountCodeValue.length != 6} onClick={() => handleClickUseCoupon()}>
                  Verify
                </Button>
              </Box>
              {error && <Typography variant="body1" color={'primary'}>{error}</Typography>}

              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1">Discount:</Typography>
                {discountedcoupon && (
                  <Typography variant="body1" color="text.secondary">
                    ৳ {discountedcoupon?.discountAmount}
                  </Typography>
                )}
              </Box>


              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ৳ {total}
                </Typography>
              </Box>
              <Link
                to="/payment"
                state={{
                  subtotal,
                  tax,
                  discount,
                  initialDiscount,
                  total,
                }}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={articles?.length < 1}
                  fullWidth
                >
                  Proceed to Checkout
                </Button>
              </Link>


            </Paper>) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;

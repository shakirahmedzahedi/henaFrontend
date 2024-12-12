import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  FormControl,
  Button,
  Collapse,
  Checkbox,
  Grid,
  Switch,
  Divider,
  Paper,
  CircularProgress
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addNewOrder } from './../reducer/services/OrderService'; // Import your Redux service
import { clearCoupon } from '../reducer/slices/DiscountCouponSlice';


const PaymentPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { subtotal, tax, initialDiscount, discount, total } = location.state;
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);
  const discountCoupon = useSelector((state) => state.coupon.discountedCoupon);
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('paymentOnDelivery');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [differentAddress, setDifferentAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    apartmentNo: '',
    houseNo: '',
    postCode: '',
    postOffice: '',
    city: '',
  });

  const [buttonLoading, setButtonLoading] = useState(false);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleAddressToggle = (event) => {
    setDifferentAddress(event.target.checked);
  };

  const handleAddressChange = (field, value) => {
    setNewAddress({ ...newAddress, [field]: value });
  };

  const handlePlaceOrder = async () => {
    const address = differentAddress
      ? {
        apartmentNo: newAddress.apartmentNo,
        houseNo: newAddress.houseNo,
        postCode: newAddress.postCode,
        postOffice: newAddress.postOffice,
        city: newAddress.city,
      }
      : user.address;

    const orderRequest = {
      cartId: cart.id,
      userId: user.id,
      address,
      paymentMethod: selectedPayment === 'paymentOnDelivery' ? 'PAYMENT_ON_DELIVERY' : 'OTHERS',
      paymentStatus: selectedPayment === 'paymentOnDelivery' ? 'PENDING' : 'COMPLETE',
      orderStatus: 'PENDING',
      discountCouponNumber: discountCoupon?.number || null,
    };

    try {
      setButtonLoading(true);
      await dispatch(addNewOrder(orderRequest)).unwrap(); // Unwrap to handle success/failure
      if (discountCoupon) {
        dispatch(clearCoupon());
      }
      setButtonLoading(false);
      navigate('/orderSuccess'); // Navigate to the success page
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  return (

    <Box sx={{ padding: .5, minHeight: '78vh', ml: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, mr: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, pb: 9 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" align="center" color="primary" sx={{ fontSize: { xs: '24px', md: '36px', lg: '36px' } }}>
          Payment
        </Typography>
      </Box>
      <Box>
        <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh' }} />
      </Box>
      {buttonLoading && <CircularProgress size={48} />}
      {!buttonLoading && (
        <Grid container mt={3}>
          <Grid item xs={12} md={8} pr={3}>
            <Card variant="outlined" sx={{ maxWidth: 1100, p: 3 }}>
              <CardContent>
                <Typography textAlign={'center'} variant="h6">
                  Payment
                </Typography>
                <Typography textAlign={'center'} variant="body2" color="textSecondary">
                  Select your payment method.
                </Typography>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <RadioGroup value={selectedPayment} onChange={handlePaymentChange}>
                    {/* Payment on Delivery */}
                    <FormControlLabel
                      value="paymentOnDelivery"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center">
                          <LocalShippingIcon sx={{ mr: 1 }} />
                          <Typography variant="body1">Cash on Delivery</Typography>
                        </Box>
                      }
                    />
                    <Collapse in={selectedPayment === 'paymentOnDelivery'}>
                      <Box pl={4} pt={1}>
                        <Typography variant="body2" color="textSecondary">
                          You’ll pay in cash when the product is delivered.
                        </Typography>
                      </Box>
                    </Collapse>

                    {/* Credit Card */}
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center">
                          <CreditCardIcon sx={{ mr: 1 }} />
                          <Typography variant="body1">Cards</Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {/* Different Shipping Address Option */}
                <Box mt={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={differentAddress}
                        onChange={handleAddressToggle}
                        color="primary"
                      />
                    }
                    label="Use a different shipping address"
                  />
                </Box>
                <Collapse in={differentAddress}>
                  <Box mt={2}>
                    <Typography variant="subtitle1">Shipping Address</Typography>
                    <Grid container spacing={2}>
                      {['apartmentNo', 'houseNo', 'postCode', 'postOffice', 'city'].map((field) => (
                        <Grid item xs={12} key={field}>
                          <TextField
                            label={field.split(/(?=[A-Z])/).join(' ')} // Split camelCase into words
                            variant="outlined"
                            fullWidth
                            value={newAddress[field]}
                            onChange={(e) => handleAddressChange(field, e.target.value)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Collapse>

                {/* Terms and Conditions Checkbox */}
                <Box mt={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAccepted}
                        onChange={handleTermsChange}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I have read, understand and accept the{' '}
                        <a href="#terms">terms and conditions</a> and the{' '}
                        <a href="#privacy">privacy policy</a>.
                      </Typography>
                    }
                  />
                </Box>

                {/* Place Order Button */}
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!termsAccepted}
                    onClick={handlePlaceOrder}
                  >
                    ORDER SUMMERY
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item textAlign={'right'} xs={12} md={4} pl={3} >
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
              {initialDiscount &&
                <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Welcome Discount:</Typography>
                  <Typography variant="body1" color="text.secondary">
                    ৳ 200.00
                  </Typography>
                </Box>

              }


              {discount &&

                <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Discount:</Typography>

                  <Typography variant="body1" color="text.secondary">
                    ৳ {discount}
                  </Typography>
                </Box>
              }

              <Box sx={{ mb: 1, p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ৳ {total}
                </Typography>
              </Box>
            </Paper>
          </Grid>

        </Grid>
      )}

    </Box>
  );
};

export default PaymentPage;

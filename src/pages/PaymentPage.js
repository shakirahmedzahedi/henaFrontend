import React, { useState } from 'react';
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
  FormLabel,
  Button,
  Collapse,
  Checkbox,
  Grid,
  Switch,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('paymentOnDelivery');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [differentAddress, setDifferentAddress] = useState(false);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleAddressToggle = (event) => {
    setDifferentAddress(event.target.checked);
  };

  return (
    <Box sx={{  ml: {xs:3, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { sm: 3, md: 15, lg: 19, xl: 23 },  mt:{xs:10,sm:20, md:25,lg:8,xl:8}}}>
    <Card variant="outlined" sx={{ maxWidth: 1100, p: 3 }}>
      <CardContent>
        <Typography textAlign={'center'} variant="h6">Payment</Typography>
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
                  <Typography variant="body1">Payment on Delivery</Typography>
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
                  <Box ml="auto" display="flex" alignItems="center">
                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" width="24" />
                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" width="24" style={{ marginLeft: 4 }} />
                    <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" width="24" style={{ marginLeft: 4 }} />
                  </Box>
                </Box>
              }
            />
            <Collapse in={selectedPayment === 'card'}>
              <Box pl={4} pt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Card number"
                      variant="outlined"
                      placeholder="1234 5678 9012 3456"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Expiry date"
                      placeholder="MM/YY"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="CVC / CVV"
                      placeholder="3 digits"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Name on card"
                      placeholder="J. Smith"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </Collapse>

            {/* Klarna */}
            <FormControlLabel
              value="klarna"
              control={<Radio />}
              label={
                <Box display="flex" alignItems="center">
                  
                  <Typography variant="body1" sx={{ ml: 1 }}>Pay  with Bkash</Typography>
                </Box>
              }
            />
            <Collapse in={selectedPayment === 'klarna'}>
              <Box pl={4} pt={1}>
                <Typography variant="body2" color="textSecondary">
                  You will be redirected to Bkash to complete your purchase.
                </Typography>
              </Box>
            </Collapse>
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
              <Grid item xs={12}>
                <TextField label="Full Name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Address Line 1" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Address Line 2" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="City" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Postal Code" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Country" variant="outlined" fullWidth />
              </Grid>
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
                I have read, understand and accept the <a href="#terms">terms and conditions</a> and the <a href="#privacy">privacy policy</a>.
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
          >
            PLACE ORDER
          </Button>
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
};

export default PaymentPage;

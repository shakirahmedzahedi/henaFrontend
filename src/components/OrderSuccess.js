import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirect to home or another page
  };

  return (
    <Box sx={{ padding: .5, minHeight: '78vh', ml: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, mr: { xs: .5, sm: 3, md: 11, lg: 15, xl: 23 }, pb:9 }}>
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" color="primary">
        Order Successfully Placed!
      </Typography>
      <Typography variant="body1" mt={2}>
        Thank you for your order. We’re processing it and will update you shortly.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleGoHome}
      >
        Go to Home
      </Button>
    </Box>
    </Box>
  );
};

export default OrderSuccess;
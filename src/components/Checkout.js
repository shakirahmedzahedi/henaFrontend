import React, { useState } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemText, Divider, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const initialItems = [
    {
      name: "Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "https://via.placeholder.com/60", // Replace with actual image URL
    },
    {
      name: "Smartphone Stand",
      price: 29.99,
      quantity: 2,
      image: "https://via.placeholder.com/60", // Replace with actual image URL
    },
    {
      name: "Laptop Sleeve",
      price: 49.99,
      quantity: 1,
      image: "https://via.placeholder.com/60", // Replace with actual image URL
    },
  ];
  const [cartItems, setCartItems] = useState(initialItems);

  const handleRemoveItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
  };

  const handleIncreaseQuantity = (index) => {
    const newItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(newItems);
  };

  const handleDecreaseQuantity = (index) => {
    const newItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
    );
    setCartItems(newItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.1; // Assume 10% tax rate
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  return (
    <Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" align="center" color="primary" sx={{ fontFamily: 'Squada One', fontSize: { xs: '40px', md: '50px', lg: '60px' } }}>
          Checkout
        </Typography>
      </Box>
      <Box>
        <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.2vh' }} />
      </Box>
      <Grid container spacing={4} mt={3} sx={{ fontFamily: 'Poppins' }}>
        {/* Left Side: List of Items */}
        <Grid item xs={12} md={8} pr={3}>
          <Typography variant="h5" gutterBottom>
            Items in Your Cart
          </Typography>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index} divider sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Product Image */}
                <Box sx={{ width: 60, height: 60, overflow: 'hidden', mr: 2 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </Box>

                {/* Product Details */}
                <ListItemText
                  primary={item.name}
                  secondary={`Price: $${item.price.toFixed(2)}`}
                  sx={{ flex: 1 }}
                />

                {/* Quantity Controls */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleDecreaseQuantity(index)} aria-label="decrease quantity">
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" color="text.primary" sx={{ mx: 1 }}>
                    {item.quantity}
                  </Typography>
                  <IconButton onClick={() => handleIncreaseQuantity(index)} aria-label="increase quantity">
                    <AddIcon />
                  </IconButton>
                </Box>

                {/* Remove Button */}
                <IconButton onClick={() => handleRemoveItem(index)} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>

                {/* Total Price for Item */}
                <Typography variant="body1" color="text.primary" sx={{ ml: 2 }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Right Side: Order Summary */}
        <Grid item textAlign={'right'} xs={12} md={4} pl={3}>
          <Typography variant="h5" textAlign={'center'} gutterBottom>
            Order Summary
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="body1" color="text.secondary">
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">Tax (10%):</Typography>
            <Typography variant="body1" color="text.secondary">
              ${tax.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary">
              ${total.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Button component={Link} to="/payment" sx={{ mt: 5 }} variant="contained" color="primary" fullWidth>
            Proceed to Checkout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;

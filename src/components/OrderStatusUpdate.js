import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';

const OrderStatusUpdate = ({ order, onUpdate, onCancel }) => {
  const [status, setStatus] = useState(order?.orderStatus || '');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdate = () => {
    onUpdate(order, status); // Call the parent-provided update function
  };

  return (
    <Box 
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <Typography variant="h6">Update Order Status</Typography>
      <Typography variant="body1">Order ID: {order.id}</Typography>

      <Select
        value={status}
        onChange={handleStatusChange}
        fullWidth
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="DELIVERED">DELIVERED</MenuItem>
        <MenuItem value="PENDING">PENDING</MenuItem>
        <MenuItem value="REVIEW">REVIEW</MenuItem>
        <MenuItem value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</MenuItem>
      </Select>

      <Box 
        sx={{
          display: 'flex',
          gap: 2,
          mt: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default OrderStatusUpdate;


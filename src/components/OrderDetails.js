import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';

const OrderDetails = ({ order }) => {
  // Helper function to format the date
  const formatDate = (date) => new Date(date).toLocaleString();
  const articles = order?.cart?.articles;
  const user = useSelector((state)=> state.auth.user);

  const addressToString = (address) => {
    return `${address?.apartmentNo || ""}, ${address?.houseNo || ""}, ${address?.postCode || ""} ${address?.postOffice || ""}, ${address?.city || ""}`.trim().replace(/^,|,$/g, "");
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

        return price* item.unit;
  };

  const calculateTax = (subtotal) => {
    return (subtotal * 0.1).toFixed(2); // Assume 10% tax rate
  };

  const calculateDiscountedPrice = (price, discount) => {
    return discount ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Invoice Header */}
      <Box display={'flex'} justifyContent="space-between" gap={4}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Invoice
        </Typography>
        <Typography variant="body1">Order ID: {order?.id}</Typography>
        <Typography variant="body1">Date: {formatDate(order?.createdAt)}</Typography>
        <Typography variant="body1">Updated: {formatDate(order?.updatedAt)}</Typography>
    
      </Box>

      {/* Buyer Info */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold">
          Customer Details:
        </Typography>
        <Typography variant="body1">Name: {order?.user?.firstName || 'N/A'}</Typography>
        <Typography variant="body1">Email: {order?.user?.email || 'N/A'}</Typography>
        <Typography variant="body1">Phone: {order?.user?.phoneNo || 'N/A'}</Typography>
        <Typography variant="body1">Address: {addressToString(order?.address) || addressToString(user?.address)}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      </Box>

      {/* Order Items */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell align="center"><strong>Price (BDT)</strong></TableCell>
              <TableCell align="center"><strong>Quantity</strong></TableCell>
              <TableCell align="center"><strong>Subtotal (BDT)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order?.cart?.articles.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product.title}</TableCell>
                <TableCell align="center">{calculateDiscountedPrice(item.product.price, item.product.discountPercentage)}</TableCell>
                <TableCell align="center">{item.unit}</TableCell>
                <TableCell align="center">{calculateItemTotal(item)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Summary */}
      <Box sx={{ textAlign: 'right', mt: 4 }}>
        <Typography variant="body1">
          <strong>Subtotal:</strong> BDT {calculateSubtotal()}
        </Typography>
        <Typography variant="body1">
          <strong>Tax (10%):</strong> BDT {calculateTax(calculateSubtotal())}
        </Typography>
        {order?.discountCoupon && (
          <Typography variant="body1">
            <strong>Discount:</strong> -BDT {order?.discountCoupon?.discountAmount?.toFixed(2)}
          </Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" fontWeight="bold" color="primary">
          Total: BDT {order?.totalAmount?.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderDetails;

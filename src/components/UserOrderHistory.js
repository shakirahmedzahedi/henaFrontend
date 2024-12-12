import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from './OrderDetails';
import { fetchOrdersByUser } from '../reducer/services/OrderService';

const UserOrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const user = useSelector((state) => state.auth.user);
  const [selectedOrder, setSelectedOrder] = useState(null); // For managing the selected order
  const [open, setOpen] = useState(false);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  useEffect(()=>{
    dispatch(fetchOrdersByUser(user?.id));
  },[dispatch])

  return (
    <div>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'secondary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order Number</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Order Status
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Total
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Created At
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Updated At
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          {loading && <CircularProgress fontSize={48}/>}
          <TableBody>
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                <TableRow
                  key={order.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white',
                  }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell align="right">{order.orderStatus}</TableCell>
                  <TableCell align="right">{order.totalAmount}</TableCell>
                  <TableCell align="right">
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(order.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" size="small" onClick={() => handleOpen(order)}>
                      Show
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Order found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Order Details */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <OrderDetails order={selectedOrder} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserOrderHistory;

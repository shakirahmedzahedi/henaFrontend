import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Dialog, DialogContent, DialogTitle} from '@mui/material';
import OrderTable from './OrderTable';
import OrderDetails from '../../components/OrderDetails';
import OrderStatusUpdate from '../../components/OrderStatusUpdate';
import { useDispatch } from 'react-redux';
import { updateOrder } from '../../reducer/services/OrderService';

const OrderSection = () => {

  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // Open details modal
  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };

  // Open update modal
  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setUpdateModalOpen(true);
  };

  // Close both modals
  const handleClose = () => {
    setDetailsModalOpen(false);
    setUpdateModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(()=> {

  },[dispatch])

  const submitUpdate = (order, status) => {
    const req = {
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: status
    }
    console.log(req);
    dispatch(updateOrder({ id: order.id, req: req }));
    handleClose();
  }

  return (
    <div>
      <OrderTable onShowDetails={handleShowDetails} onUpdateStatus={handleUpdateStatus} />

      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <OrderDetails order={selectedOrder} />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Modal */}
      <Dialog open={isUpdateModalOpen} onClose={handleClose}  maxWidth="md" fullWidth>
      <DialogTitle>Order Update</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <OrderStatusUpdate order={selectedOrder} onUpdate={submitUpdate} onCancel={handleClose}/>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderSection;

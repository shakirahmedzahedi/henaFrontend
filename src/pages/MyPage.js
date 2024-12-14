import React, {useState} from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook from react-router-dom
import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import UserOrderHistory from '../components/UserOrderHistory';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '../reducer/services/AuthService';

const MyPage = () => {
  const dispatch = useDispatch();
  // Retrieve the user data from the location state
  const location = useLocation();
  const user = location.state?.user; 
  const stateUser = useSelector((state)=> state.auth.user);
  const loading = useSelector((state)=> state.auth.loading);

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [address, setAddress] = useState({
    apartmentNo: stateUser?.address?.apartmentNo,
    houseNo: stateUser?.address?.houseNo,
    postCode: stateUser?.address?.postCode,
    postOffice: stateUser?.address?.postOffice,
    city: stateUser?.address?.city,
  });
  
  if (!user) {
    return <Typography variant="h6">User data not found.</Typography>;
  }

  const handleEditPersonalInfo = () => {
    // You can add functionality to open a modal or navigate to an edit form
    console.log("Edit Personal Info");
};

const handleEditAddress = () => {
  setAddress(user.address || {});
  setOpenAddressModal(true);
};

const handleCloseAddressModal = () => {
  setOpenAddressModal(false);
};

const handleAddressChange = (e) => {
  const { name, value } = e.target;
  setAddress((prevAddress) => ({
    ...prevAddress,
    [name]: value,
  }));
};

const handleSaveAddress = async() => {
  const req = {
    userId: user?.id,
    ...address,
  }
  await dispatch(updateAddress(req));
  setOpenAddressModal(false);
};

  return (
    <Box sx={{ padding: 2, minHeight:'78vh', ml: {xs:2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs:2, sm: 3, md: 15, lg: 19, xl: 23 }}}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" align="center" color="primary" sx={{  fontSize: { xs: '24px', md: '36px', lg: '36px' } } }>
          Contact Information
        </Typography>
      </Box>
      <Box>
        <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh', mb: 3 }} />
      </Box>
      <Grid container spacing={3}>
        {/* Personal Information Paper */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Personal Information</Typography>
                    <IconButton onClick={handleEditPersonalInfo}>
                        <EditIcon />
                    </IconButton>
                </Box>
            <Divider />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              <strong>First Name:</strong> {user.firstName}
            </Typography>
            <Typography variant="body1">
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {user.phoneNo}
            </Typography>
            <Typography variant="body1">
              <strong>Mobile:</strong> {user.phoneNo}
            </Typography>
          </Paper>
        </Grid>

        {/* Address Information Paper */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6"> Address Information</Typography>
                    <IconButton onClick={handleEditAddress}>
                        <EditIcon />
                    </IconButton>
                </Box>
           
            <Divider />
            <Typography variant="body1">
              <strong>House NO:</strong> {stateUser.address?.houseNo}
            </Typography>
            <Typography variant="body1" >
              <strong>Apartment No:</strong> {stateUser.address?.apartmentNo}
            </Typography>
            
            <Typography variant="body1">
              <strong>Post Code:</strong> {stateUser.address?.postCode}
            </Typography>
            <Typography variant="body1">
              <strong>Post Office:</strong> {stateUser.address?.postOffice}
            </Typography>
            <Typography variant="body1">
              <strong>City:</strong> {stateUser.address?.city}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', mt:3 }}>
        <Typography variant="h3" align="center" color="primary" sx={{  fontSize: { xs: '24px', md: '36px', lg: '36px' } } }>
          History
        </Typography>
      </Box>
      <Box>
        <Divider sx={{ bgcolor: 'info.dark', minHeight: '.2vh', mb: 3 }} />
      </Box>
      <UserOrderHistory/>

      <Dialog open={openAddressModal} onClose={handleCloseAddressModal}>
        <DialogTitle>Edit Address</DialogTitle>
       
        <DialogContent>
        {loading ? (
          <Box minHeight={"50vh"} minWidth={"50vh"}>
          <CircularProgress size={48}/>
          </Box>):
        (<>
          <TextField
            label="Apartment No"
            name="apartmentNo"
            value={address.apartmentNo}
            onChange={handleAddressChange}
            inputProps={{ maxLength: 6 }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="House No"
            name="houseNo"
            value={address.houseNo}
            onChange={handleAddressChange}
            inputProps={{ maxLength: 6 }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Post Code"
            name="postCode"
            value={address.postCode}
            onChange={handleAddressChange}
            inputProps={{ maxLength: 6 }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Post Office"
            name="postOffice"
            value={address.postOffice}
            onChange={handleAddressChange}
            inputProps={{ maxLength: 10 }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            inputProps={{ maxLength: 10 }}
            fullWidth
            margin="normal"
          />
          </>
           )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddressModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveAddress} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
       
    </Box>
  );
};

export default MyPage;

import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook from react-router-dom
import { Grid, Paper, Typography, Box, Divider, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

const MyPage = () => {
  // Retrieve the user data from the location state
  const location = useLocation();
  const user = location.state?.user; // Safe access to the passed user object
  
  if (!user) {
    return <Typography variant="h6">User data not found.</Typography>;
  }

  const handleEditPersonalInfo = () => {
    // You can add functionality to open a modal or navigate to an edit form
    console.log("Edit Personal Info");
};

const handleEditAddress = () => {
    // You can add functionality to open a modal or navigate to an edit form
    console.log("Edit Address");
};
  return (
    <Box sx={{ padding: 2, minHeight:'78vh'}}>
      <Typography variant="h4" gutterBottom align="center">
        My Profile
      </Typography>
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
              <strong>Phone:</strong> {user.phone}
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
                    <IconButton onClick={handleEditPersonalInfo}>
                        <EditIcon />
                    </IconButton>
                </Box>
           
            <Divider />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              <strong>Street:</strong> {user.address?.apartmentNo}
            </Typography>
            <Typography variant="body1">
              <strong>City:</strong> {user.address?.houseNo}
            </Typography>
            <Typography variant="body1">
              <strong>State:</strong> {user.address?.postCode}
            </Typography>
            <Typography variant="body1">
              <strong>ZIP:</strong> {user.address?.postOffice}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {user.address?.city}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom align="center">
        History
      </Typography>
    </Box>
  );
};

export default MyPage;

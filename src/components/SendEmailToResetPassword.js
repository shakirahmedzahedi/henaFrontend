import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { get } from './../reducer/api/APIService';

function SendEmailToResetPassword() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await get(`/auth/sendEmailForRestPassword?email=${ email }`); 
        setSuccess(true);
        setError('');
      } catch (err) {
        setError(err.message);
        setSuccess(false);
      }
    };
  
    return (
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Send Reset Email
        </Typography>
        {success && <Alert severity="success">Check your email to reset password</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send Email
          </Button>
        </form>
      </Box>
    );
  }

export default SendEmailToResetPassword;

import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper,Divider } from '@mui/material';

const ContactPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
       <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h1' align='center' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '40px', md: '50px', lg: '60px' } }}>
                   About Us
                </Typography>
            </Box>
            <Box >
                <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.2vh' }} />
            </Box >
      <Typography variant="body1" align="center" color="text.secondary" paragraph mt={3}>
        We would love to hear from you! Reach out to us through the form below or using our contact information.
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Information and Map Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Our Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Address:</strong> 1234 Example Street, City, State, ZIP
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Phone:</strong> (123) 456-7890
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Email:</strong> contact@company.com
          </Typography>

          {/* Embedded Google Map */}
          <Box
            sx={{
              mt: 4,
              border: '1px solid #ddd',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093705!2d144.95373531531796!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775c2c72b2a1e0!2sEnvato!5e0!3m2!1sen!2sus!4v1616664872347!5m2!1sen!2sus"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Grid>

        {/* Contact Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Send Us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;

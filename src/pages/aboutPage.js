import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Divider } from '@mui/material';

const teamMembers = [
  { name: "XXXXXXX XXXXXX", role: "CEO", image: "https://via.placeholder.com/150" },
  { name: "YYYYYYY YYYY", role: "CTO", image: "https://via.placeholder.com/150" },
  { name: "ZZZZ ZZZZZZ", role: "COO", image: "https://via.placeholder.com/150" },
];

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h1' align='center' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '40px', md: '50px', lg: '60px' } }}>
                   About Us
                </Typography>
            </Box>
            <Box >
                <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.2vh' }} />
            </Box >
      {/* Our Story Section */}
      
      <Typography variant="body1" align="center" color="text.secondary" paragraph mt={3}>
        Welcome to Our Company! We are a passionate team dedicated to delivering innovative solutions
        and exceptional services to our customers worldwide.
      </Typography>

      {/* Our Mission Section */}
      <Box sx={{ my: 6 , fontFamily: 'Poppins' }}>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Our mission is to revolutionize the industry by offering cutting-edge products and unparalleled
          customer experiences. We strive to empower individuals and businesses through innovation, creativity,
          and excellence.
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 6 }} />

      {/* Our Team Section */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={4} key={index} align="center">
              <Avatar
                alt={member.name}
                src={member.image}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <Typography variant="h6">{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {member.role}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;

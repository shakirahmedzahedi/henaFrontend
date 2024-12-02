import React from 'react'
import { Box, Grid, Typography, Divider } from '@mui/material'
import hero from './../assets/hero.jpeg';
import truck from './../assets/truck (1).png';
import customer from './../assets/customer-service (2).png';
import hand from './../assets/hand (1).png';
import sale from './../assets/discount (2).png';
import CatagorySection from '../components/catagorySection';
import BestSellerSection from '../components/bestSellerSection';
import ProductDetails from '../components/ProductDetails';
import Checkout from '../components/Checkout';
import AgeLimitSection from '../components/AgeLimitSection';
import ImageSlider from '../components/ImageSlider';


const homePage = () => {
  return (
    <Box >

      <Box sx={{ ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }} >

        <ImageSlider />
      </Box>


      <Box sx={{ mt: 3, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }}>
        <AgeLimitSection />
      </Box>
      <Box sx={{ mt: 3, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }}>
        <CatagorySection />
      </Box>
      <Box sx={{ mt: 3, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 } }}>
         <BestSellerSection />
      </Box>



      <Box sx={{ mt: 3, p: 2, background: '#edebeb' }}>
        <Box sx={{ mt: 3, ml: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 2, sm: 3, md: 15, lg: 19, xl: 23 }, pb:{xs:10} }}>
          <Grid container alignItems="center">
            <Grid item xs={12} lg={3}>
              <Typography
                variant="h4"
                align="center" // Centers title horizontally
                color="primary"
                sx={{
                  
                  fontSize: { xs: '16px', md: '20px', lg: '28px' }, // Adjusted font size
                }}
              >
                Hena Promies
              </Typography>
            </Grid>

            {/* Features Section */}
            <Grid item xs={12} lg={9}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <img
                      src={truck}
                      alt="Home Delivery"
                      style={{ width: '80px', height: '65px' }} // Reduced size
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontFamily: 'Squada One',
                        fontSize: { xs: '12px', md: '16px', lg: '20px' }, // Reduced text size
                      }}
                    >
                      Home Delivery
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <img
                      src={hand}
                      alt="Price Guarantee"
                      style={{ width: '80px', height: '65px' }} // Reduced size
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontFamily: 'Squada One',
                        fontSize: { xs: '12px', md: '16px', lg: '20px' }, // Reduced text size
                      }}
                    >
                      Price Guarantee
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <img
                      src={sale}
                      alt="Low Price"
                      style={{ width: '80px', height: '65px' }} // Reduced size
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontFamily: 'Squada One',
                        fontSize: { xs: '12px', md: '16px', lg: '20px' }, // Reduced text size
                      }}
                    >
                      Low Price
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <img
                      src={customer}
                      alt="24/7 Customer Service"
                      style={{ width: '80px', height: '65px' }} // Reduced size
                    />
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontFamily: 'Squada One',
                        fontSize: { xs: '12px', md: '16px', lg: '20px' }, // Reduced text size
                      }}
                    >
                      24/7 Customer Service
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Box>
  )
}

export default homePage

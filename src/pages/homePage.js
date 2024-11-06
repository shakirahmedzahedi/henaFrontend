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
    <Box sx={{ ml: {xs:2, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs:2, sm: 3, md: 15, lg: 19, xl: 23 } }}>

      <Box >

        <ImageSlider />
      </Box>


      <Box sx={{ mt: 3 }}>
        <AgeLimitSection />
      </Box>
      <Box sx={{ mt: 3 }}>
        <CatagorySection />
      </Box>
      <Box sx={{ mt: 3 }}>
        <BestSellerSection />
      </Box>



      <Box sx={{ mt: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h1' align='left' color={'primary'} sx={{ fontFamily: 'Squada One', fontSize: { xs: '20px', md: '24px', lg: '36px' } }}>
           Hena Promies
          </Typography>
        </Box>
        {/* <Box >
          <Divider sx={{ bgcolor: 'secondary.main', minHeight: '.2vh' }} />
        </Box > */}
        <Box sx={{ textAlign: 'center' }}>
          <Grid container alignItems={'center'} spacing={1} mt={2} >

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
              <img
                src={truck}
                alt={truck}
                style={{ width: '125px', height: '100px' }}

              />
              <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Squada One', fontSize: { xs: '15px', md: '20px', lg: '25px' } }}>
                Home Delivery
              </Typography>

            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
              <img
                src={hand}
                alt={hand}
                style={{ width: '125px', height: '100px' }}

              />
              <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Squada One', fontSize: { xs: '15px', md: '20px', lg: '25px' } }}>
                Price Garantee
              </Typography>

            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
              <img
                src={sale}
                alt={sale}
                style={{ width: '125px', height: '100px' }}

              />
              <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Squada One', fontSize: { xs: '15px', md: '20px', lg: '25px' } }}>
                Low Price
              </Typography>

            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ mt: 2 }}>
              <img
                src={customer}
                alt={customer}
                style={{ width: '125px', height: '100px' }}

              />
              <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: 'Squada One', fontSize: { xs: '15px', md: '20px', lg: '25px' } }}>
                24/7 Customer Service
              </Typography>

            </Grid>

          </Grid>
        </Box>
      </Box>




     {/*  <Box sx={{ mt: 2 }}>
        <ProductDetails />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Checkout />
      </Box>
 */}

    </Box>
  )
}

export default homePage

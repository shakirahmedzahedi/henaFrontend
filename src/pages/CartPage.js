import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'
import Checkout from '../components/Checkout'

const CartPage = () => {
  return (
    <Box sx={{  ml: {xs:3, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { sm: 3, md: 15, lg: 19, xl: 23 },  mt:{xs:10,sm:20, md:15,lg:5,xl:5}}}>
<Checkout/>
      
    </Box>
 
  )
}
export default CartPage;

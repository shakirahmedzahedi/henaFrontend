import React from 'react'
import { Box } from '@mui/material';
import Favorite from '../components/Favorite'

const FavoritePage = () => {
  return (
    <Box sx={{ minHeight:'70vh', ml: { xs: 3, sm: 3, md: 15, lg: 19, xl: 23 }, mr: { xs: 3, sm: 3, md: 15, lg: 19, xl: 23 }, /*  mt:{xs:10,sm:20, md:15,lg:5,xl:5} */ }}>
    <Favorite />

  </Box>
  )
}

export default FavoritePage

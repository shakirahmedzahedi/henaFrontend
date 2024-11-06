import React from 'react'
import { Box } from '@mui/material'
import ProductForm from '../components/product/ProductForm'

const AddProductPage = () => {
  return (
    <Box sx={{ ml: { sm: 3, md: 15, lg: 19, xl: 23 }, mr: { sm: 3, md: 15, lg: 19, xl: 23 },  mb:{xs:10,sm:20, md:15,lg:5,xl:5},  mt:{xs:10,sm:20, md:15,lg:5,xl:5}}}>

        <ProductForm/>
        </Box>
  )
}

export default AddProductPage

import { Box, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import GradientCard from '../../special/GradientCard';
import React from 'react'
import { useNavigate } from 'react-router';

const ProductsSection = () => {
  const navigate = useNavigate();

  const handleAddNewProduct = ()=>{
    navigate('/adminPortal/products/addNew')
  }

  const handleShowAllProducts = () =>{
    navigate('/adminPortal/products/showAll')
  }

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
                {/* Title Section */}
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Product Section
                </Typography>

                {/* Cards Container using Grid */}
                <Grid container spacing={2} justifyContent="center" >
                    {/* First Card with Click Event */}
                    <Grid item xs={12} sm={6} md={4} onClick={()=> handleAddNewProduct()}>
                        <GradientCard
                            text="Add New Product"
                            gradientColors={['#4e54a7', '#ee0999']}
                            height={200}
                            textColor="#ffffff"
                        />
                    </Grid>

                    {/* Second Card */}
                    <Grid item xs={12} sm={6} md={4}  onClick={()=>handleShowAllProducts()} >
                        <GradientCard
                            text="Show all products"
                            gradientColors={['#ff6a01', '#ee0999']}
                            height={200}
                            textColor="#ffffff"
                        />
                    </Grid>
                </Grid>
                </Box>
  )
}

export default ProductsSection

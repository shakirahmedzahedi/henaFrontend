import { createSlice } from '@reduxjs/toolkit';
import {fetchAllProducts, fetchProductById, addProduct, updateProduct, updateProductStock, deleteProduct, clearError} from './../services/ProductService';

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    success:null,
  };
  
  // Create slice
  const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(clearError, (state) => {
        state.error = null;
      })
        // Fetch all products
        .addCase(fetchAllProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // Fetch product by ID
        .addCase(fetchProductById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
          state.loading = false;
          state.product = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // Add a new product
        .addCase(addProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products.push(action.payload);
          state.success = "Successfully Add a new Product!"
        })
        .addCase(addProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // Update an existing product
        .addCase(updateProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.products.findIndex(p => p.id === action.payload.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // Update stock for a product
        .addCase(updateProductStock.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProductStock.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.products.findIndex(p => p.id === action.payload.id);
          if (index !== -1) {
            state.products[index].stock = action.payload.stock;
          }
        })
        .addCase(updateProductStock.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // Delete a product
        .addCase(deleteProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products = state.products.filter(p => p.id !== action.payload);
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default productSlice.reducer;